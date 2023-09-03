import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const [active, setActive] = useState('')

  const { categories } = state;

  const {loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  console.log(categories)

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };
  console.log(active)
  return (
    <div className='category_menu'>
      <h2 className='category_h2'>Category:</h2>
      <button className={active === '' ? 'active' : 'category_button'} onClick={() => { handleClick(''); setActive('')}}>All</button>
      {categories.map(item => (
        <button
          className={active === item.name ? 'active' : 'category_button'}
          key={item._id}
          onClick={() => {
            handleClick(item._id);
            setActive(item.name)
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
