<script setup lang="ts">
const pagesTotal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const currentPage = ref(1)

const visiblePageStart = ref(0)
const visiblePageFinish = ref(5)


const setNextPage = () => {
  setPage( currentPage.value + 1)
}

const setPrevPage = () => {
  setPage( currentPage.value - 1)
}

const setPage = (page: number) => {
  if (page < 5) {
    currentPage.value = page
    visiblePageStart.value = 0
    visiblePageFinish.value = 5
  }  else if (page > pagesTotal.length - 4) {
    visiblePageStart.value = pagesTotal.length - 5
    visiblePageFinish.value = pagesTotal.length + 1
    currentPage.value = page
  } else if (page >= 5 && page <= pagesTotal.length - 4) {
    currentPage.value = page
    visiblePageStart.value = pagesTotal[page] - 4
    visiblePageFinish.value = pagesTotal[page] + 1
  }

}

</script>

<template>
  <div class="pagination">
    <div
        class="pagination__prev"
        v-if="currentPage >= 5"
        @click="setPrevPage"
    ></div>
    <div class="pagination__page" v-if="currentPage >= 5 ">...</div>
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
    <div class="pagination__page"
         v-if="currentPage <= pagesTotal.length - 4">
      ...
    </div>
    <div class="pagination__next"
         v-if="currentPage <= pagesTotal.length - 4"
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
