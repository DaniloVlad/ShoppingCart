import React from 'react';
import { Link } from 'react-router-dom';
import './MenuItems.css';

const MenuItems = ({menu_items}) => {
    if(menu_items === undefined || menu_items.length === 0)
        return <div></div>;
    else {
        return menu_items.map((value, index) => {
               return (
                   <div key={index} className={value.subCategories[0] === null ? "nav-item" : "nav-item submenu"}>
                        <Link className="nav-link" to={"/categories/"+value.name}>
                            {value.name+" "}
                            {value.subCategories[0] === null ? "" : <i className="fas fa-caret-down"></i> }
                        </Link>
                        
                        
    
                        <div className="dropdown"> 
                        {
                            value.subCategories.map((value, index) => {
                                if(value === null) return;
                                return <Link className="nav-link" to={"/products/"+value}>{value}</Link>
                            })
                        }
    
                        </div>
                    </div>

                ) 
            });
    }
        
    
}


export default MenuItems;