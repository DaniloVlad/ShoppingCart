import React from 'react';
import { Link } from 'react-router-dom';
import './MenuItems.css';

const MenuItems = ({menu_items}) => {
    if(menu_items === undefined || menu_items.length === 0)
        return <div></div>;
    else {
        return menu_items.map((value, index) => {
               return (
                   <div key={index} className="menu-item">
                        <div className="menu-content">
                            <Link className="menu-link" to={"/categories/"+value.name}>{value.name}</Link>
                            {value.subCategories[0] === null ? "" : <i className="fas fa-caret-down"></i> }
                        </div>
    
                        <div className="dropdown-submenu"> 
                        {
                            value.subCategories.map((value, index) => {
                                if(value === null) return;
                                return (
                                    <div key={value} className="submenu-item">
                                        <Link className="menu-link" to={"/products/"+value}>{value}</Link>
                                    </div>
                                );
                            })
                        }
    
                        </div>
                    </div>

                ) 
            });
    }
        
    
}

export default MenuItems;