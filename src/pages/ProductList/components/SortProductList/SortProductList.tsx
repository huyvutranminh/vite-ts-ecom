import classNames from 'classnames'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Props } from 'src/components/Pagination/Pagination'
import path from 'src/constants/path'
import { sortBy, order as orderConst } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'

export default function SortProductList({ queryConfig }: Props) {
  const { sort_by = sortBy.view, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortby = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8  px-4 text-center text-sm capitalize', {
              'bg-emerald-400 text-white hover:bg-emerald-400/80': isActiveSortby(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortby(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8  px-4 text-center text-sm capitalize', {
              'bg-emerald-400 text-white hover:bg-emerald-400/80': isActiveSortby(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortby(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8  px-4 text-center text-sm capitalize', {
              'bg-emerald-400 text-white hover:bg-emerald-400/80': isActiveSortby(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortby(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-4 text-left text-sm capitalize outline-none', {
              'bg-emerald-400 text-white hover:bg-emerald-400/80': isActiveSortby(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortby(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConst.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConst.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}
