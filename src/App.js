
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [product,setProduct] = useState([]);

  const [page, setPage] = useState(1);

  const fetchProducts = async () => 
  {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);

    const data = await res.json();

   if(data && data.products)
   {
    setProduct(data.products);
   }
   
   
  }
  console.log(product);

  const handlethePage = (selectedPage) =>
  {
    if (selectedPage >= 1 && selectedPage <= product.length / 10 && selectedPage !== page) {
      setPage(selectedPage)
    }
  }
  

  useEffect( () =>
  {
    fetchProducts();
  },[])
  return (
    <div className="App">
      {
        product.length>0 && (
          <div className='products'> 
          {product.slice(page*10-10,page*10).map( (prod) =>
          {
              return(
                <span className='products__single' key={prod.id}>

                  <img src={prod.thumbnail} alt={prod.title}/>

                  <span> {prod.title}</span>
                </span>
                
              )
          })}

        
         
         

        </div>
        )
        
      }

      {
        product.length>0 && (
          <div className='pagination'>
            <span className={page > 1 ? "" : "pagination__disable"} onClick = { () => handlethePage(page-1)}>◀️</span>
            {[...Array(product.length/10)].map((_,index) =>
            {
              return(
                <span onClick = { () => handlethePage(index+1)} key={index} className={page === index + 1 ? "pagination__selected" : ""}>{index+1}</span>

              )
            
            })}
            <span className={page < product.length / 10 ? "" : "pagination__disable"} onClick = { () => handlethePage(page+1)}>▶️</span>
             </div>
        )
      }
      </div>
  );
}

export default App;
