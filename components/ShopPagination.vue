<script setup lang="ts">
import {usePlantsStore} from "~/store/plants";
import {storeToRefs} from "pinia";

const plantsStore = usePlantsStore()
const {shownPlants, limit, currentPage: page} = storeToRefs(plantsStore)


const pagesTotal = computed(() => {
  const totalPages = Math.ceil(shownPlants.value.length / limit.value)
  const pagesArray = []

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i)
  }

  return pagesArray
})

const currentPage = ref(1)

const visiblePageStart = ref(0)
const visiblePageFinish = ref(5)


const setNextPage = () => {
  setPage(currentPage.value + 1)
}

const setPrevPage = () => {
  setPage(currentPage.value - 1)
}

const setPage = (page: number) => {
  plantsStore.setPage(page)
  currentPage.value = page
  if (page < 5) {
    visiblePageStart.value = 0
    visiblePageFinish.value = 5
  } else if (page > pagesTotal.value.length - 4) {
    visiblePageStart.value = pagesTotal.value.length - 5
    visiblePageFinish.value = pagesTotal.value.length + 1
  } else if (page >= 5 && page <= pagesTotal.value.length - 4) {
    visiblePageStart.value = pagesTotal.value[page] - 4
    visiblePageFinish.value = pagesTotal.value[page] + 1
  }
}

watch(() => page.value,
    (value) => {
      currentPage.value = value
    })

</script>

<template>
  <div class="pagination">
    <div
        class="pagination__prev"
        v-if="currentPage >= 5 && pagesTotal.length > 5"
        @click="setPrevPage"
    ></div>

    <div
        class="pagination__page"
        :class="{
          'pagination__page_active': page === currentPage
        }"
        v-for="page in pagesTotal.slice(visiblePageStart, visiblePageFinish)"
        :key="page"
        @click="setPage(page)"
    >
      {{ page }}
    </div>

    <div class="pagination__next"
         v-if="currentPage <= pagesTotal.length - 4 && pagesTotal.length > 5"
         @click="setNextPage"
    ></div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.pagination__page,
.pagination__prev,
.pagination__next {
  width: 35px;
  height: 35px;
  color: #3D3D3D;
  border-radius: 4px;
  border: 1px solid #E5E5E5;
  font-family: 'CeraPro-Light', sans-serif;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  transition: 0s all;
}

.pagination__page_active {
  background-color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 800;
  color: #fff;
  transition: 0.2s all;
}

.pagination__prev,
.pagination__next {
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('@/assets/svg/page_next.svg');
}

.pagination__prev {
  transform: scaleX(-1);
}

</style>
