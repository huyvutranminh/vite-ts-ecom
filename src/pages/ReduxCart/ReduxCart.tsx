import { RootState } from 'src/store'
import { useSelector } from 'react-redux'
import path from '../../constants/path'
import { Link } from 'react-router-dom'
import { formatCurrency } from 'src/utils/utils'

export default function ReduxCart() {
  const cartItemList = useSelector((state: RootState) => state.cart.items)
  console.log('list', cartItemList)
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {cartItemList.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        {/* <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        /> */}
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {cartItemList.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {cartItemList.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              {/* <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              /> */}
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link className='h-20 w-20 flex-shrink-0' to={`${path.home}${purchase._id}`}>
                                  <img alt={purchase.name} src={purchase.image} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link to={`${path.home}${purchase._id}`} className='text-left line-clamp-2'>
                                    {purchase.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.price_before_discount)}
                                </span>
                                <span className='ml-3'>₫{formatCurrency(purchase.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <span>{purchase.quantity}</span>
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>₫{formatCurrency(purchase.price * purchase.quantity)}</span>
                            </div>
                            <div className='col-span-1'>
                              <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none'>Chọn tất cả ({cartItemList.length})</button>
                <button className='mx-3 border-none bg-none'>Xóa</button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán (sản phẩm):</div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
                  Mua hàng
                </Button>
              </div>
            </div> */}
          </>
        ) : (
          <div className='text-center'>
            {/* <img src={ alt='no purchase' className='mx-auto h-24 w-24' /> */}
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
