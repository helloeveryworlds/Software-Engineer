import React, { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import SearchBar from "../../components/search-bar/search-bar";

import "./shopping.css";

const Shopping = () => {
  const { itemList } = useContext(ProductsContext);
  console.log(itemList);
  // itemList["Vegetables"].items[0].name : you will get "Carrot"

  return (
    <div id="shopping-container">
      <div className="shopping-search-container">
        <SearchBar />
      </div>
      <div className="shopping-categories">
        <div className="category-heading">
          <h4 id="category-heading-name">Categories</h4>
          <hr></hr>
        </div>
        <div className="categories">
          <ul className="item-list">
            <li className="item" id="dairy"></li>
            <li className="item" id="fruits"></li>
            <li className="item" id="grains"></li>
            <li className="item" id="meat"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

//         <div id="shopping-container">
//                 <div className="shopping-search-container">
//                     <div className='shopping-search-bar'>
//                         <form onSubmit={this.handleSearchSubmit} className="shopping-search-form">
//                             <input
//                                 className="shopping-search-input"
//                                 type="text"
//                                 placeholder="Search"
//                             />
//                         </form>
//                     </div>
//                 </div>
//             <div className="shopping-categories">
//                 <div className="category-heading">
//                     <h4 id="category-heading-name">Categories</h4><hr></hr>
//                 </div>
//                 <div className="categories">
//                     <ul className="item-list">
//                         <li className="item" id="dairy">
//                             <Link className="fruits-container" to="/dairy">
//                                 <div>
//                                     <img src={DairyLogo} alt="dairy-logo" className="dairy-png" />
//                                 </div>
//                             </Link>

//                         </li>
//                         <li className="item" id="fruits">
//                             <Link className="fruits-container" to="/fruits">
//                                 <div>
//                                     <img src={FruitsLogo} alt="fruits-logo" className="fruits-png" />
//                                 </div>
//                             </Link>
//                         </li>
//                         <li className="item" id="grains">
//                         <Link className="fruits-container" to="/grains">
//                                 <div>
//                                     <img src={GrainsLogo} alt="grains-logo" className="grains-png" />
//                                 </div>
//                             </Link>
//                         </li>
//                         <li className="item" id="meat">
//                             <Link className="meat-container" to="/meat">
//                                 <div>
//                                     <img src={MeatLogo} alt="meat-logo" className="meat-png" />
//                                 </div>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         );
//     };
// };

export default Shopping;
