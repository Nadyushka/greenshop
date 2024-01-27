import * as yup from 'yup'

export const validationSchema = yup.object().shape({
    title: yup.string().required('Field is required')
        .matches(/^[a-zA-Zа-яА-ЯЁё ]*$/, 'Only letters are allowed'),
    price: yup.number().typeError('Only numbers are allowed').required('Field is required'),
    discount: yup.number(),
    type: yup.string().required('Field is required'),
    size: yup.string().required('Field is required'),
})

export const postValidationSchema = yup.object().shape({
    date: yup.string().required('Field is required'),
    length: yup.string().required('Field is required'),
    title: yup.string().required('Field is required'),
    text: yup.string().required('Field is required'),
    fullText: yup.string().required('Field is required'),
})


export const carePostValidationSchema = yup.object().shape({
    title: yup.string().required('Field is required'),
    text: yup.string().required('Field is required'),
    fullText: yup.string().required('Field is required'),
})

export const personalDataValidationSchema = yup.object().shape({
    firstName: yup.string().required('Field is required')
        .matches(/^[a-zA-Zа-яА-ЯЁё ]*$/, 'Only letters are allowed'),
    secondName: yup.string().required('Field is required')
        .matches(/^[a-zA-Zа-яА-ЯЁё ]*$/, 'Only letters are allowed'),
    password: yup.string().required('Field is required')
        .min(5, 'Minimum length is 5 symbols')
        .max(10, 'Maximum length is 10 symbols'),
    email: yup.string()
        .nullable()
        .test('emailCheck', 'Invalid email', val => {
            if (val === null || val === '' || val === undefined)
                return true

            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
        }),
    phone: yup.number().typeError('Only numbers are allowed').required('Field is required'),
})

export const personalAddressValidationSchema = yup.object().shape({
    addressName: yup.string().required('Field is required'),
    streetHouse: yup.string().required('Field is required'),
    city: yup.string().required('Field is required'),
    state: yup.string().required('Field is required'),
    country: yup.string().required('Field is required'),
    zip: yup.number().typeError('Only numbers are allowed'),
})

