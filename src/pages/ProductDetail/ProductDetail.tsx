import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import ProductRating from 'src/components/ProductRating'
import QuantityController from 'src/components/QuantityController'
import { purchasesStatus } from 'src/constants/purchase'
import { Product } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
// import { useDispatch } from 'react-redux'
// import { addItem } from '../ReduxCart/cartSlice'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'

export default function ProductDetail() {
  const { t } = useTranslation(['product'])
  const { isAuthenticated } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productData } = useQuery({
    queryKey: ['products', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const navigate = useNavigate()

  const product = productData?.data.data
  // const dispatch = useDispatch()
  const [ImagesIndexRange, setImagesIndexRange] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)

  const currentImages = useMemo(
    () => (product ? product?.images.slice(...ImagesIndexRange) : []),
    [product, ImagesIndexRange]
  )

  const addToCartMutation = useMutation(purchaseApi.addToCart)

  useEffect(() => {
    if (product && product.images.length > 0) setActiveImage(product.images[0])
  }, [product])

  const changeActiveImage = (img: string) => {
    setActiveImage(img)
  }

  const prev = () => {
    console.log(ImagesIndexRange)
    if (ImagesIndexRange[0] > 0) {
      setImagesIndexRange((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const next = () => {
    console.log(ImagesIndexRange)
    if (ImagesIndexRange[1] < (product as Product).images.length) {
      setImagesIndexRange((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  // const addItemHandler = () => {
  //   if (product) {
  //     const itemToAdd = { ...product, quantity }
  //     dispatch(addItem(itemToAdd))
  //     toast.success('Item added to cart successfully')
  //   }
  // }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imgRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const resetZoom = () => {
    imgRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (val: number) => {
    setBuyCount(val)
  }

  const addToCart = () => {
    if (isAuthenticated) {
      addToCartMutation.mutate(
        { buy_count: buyCount, product_id: product?._id as string },
        {
          onSuccess: () => {
            toast.success('Item added to cart successfully')
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
          }
        }
      )
    } else {
      navigate(path.login)
    }
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({
      buy_count: buyCount,
      product_id: product?._id as string
    })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{product.name}</title>
        <meta
          name='description'
          content={convert(product.description, {
            wordwrap: 120,
            limits: {
              ellipsis: '...'
            }
          })}
        ></meta>
      </Helmet>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative  w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={resetZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover transition-transform duration-300 group-hover:scale-125'
                  ref={imgRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={prev}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => changeActiveImage(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover transition-transform duration-300 group-hover:scale-125'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-emerald-300'></div>}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassNames='fill-orange text-orange w-4 h-4'
                    inactiveClassNames='fill-gray-300 text-gray-300 w-4 h-4'
                  />
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  <div className='text-sm'>
                    <span>{formatNumberToSocialStyle(product.sold)}</span>
                    <span className='ml-1 text-gray-500'>Đã bán</span>
                  </div>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-emerald-300'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-emerald-300 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  value={buyCount}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>
                  {product.quantity} {t('product:available')}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-emerald-200 bg-emerald-100 px-5 capitalize text-emerald-600 shadow-sm hover:bg-emerald-50'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-emerald-600 text-emerald-600'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm border-emerald-200 bg-emerald-100 px-5 capitalize text-emerald-600 shadow-sm outline-none hover:bg-emerald-50'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phảm</div>
          <div className='loading-loose mx-4 mt-12 mb-4 text-sm'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
