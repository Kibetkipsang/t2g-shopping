import { useState } from "react";
import "./styles/shopping.css"

const ShoppingCart = () => {
    interface ShoppingItems{
        name: string;
        quantity: number;
        price: number;
    }

    
    const [itemList, setItemList] = useState<ShoppingItems[]>([]);
    const [itemData, setItemData] = useState<ShoppingItems>({
        name: "",
        quantity: 0,
        price: 0,
    });
    const [total, setTotal] = useState<number>(0);
    const [_error, setError] = useState<string>("");

    

    function handleAddItem(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!itemData.name || itemData.quantity <= 0 || itemData.price <= 0){
            setError("All fields are required.");
            return;
        }
        setError("");
        const newItems = [...itemList, itemData];
        setItemList(newItems);
        setItemData({
            name: "",
            quantity: 0,
            price: 0,
        });
        calculateTotal(newItems);
    }

    function calculateTotal(items: ShoppingItems[]) {
        const total = items.reduce((accumulator, item) => 
         accumulator + item.quantity * item.price, 0);
         setTotal(total);
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setItemData({...itemData, [name]: name === "name" ? value : Number(value)});
    }
  
    return(
        <>
        <div className="overall">
            <div className="item-inputs">
            <form action="" className="form-input" onSubmit={handleAddItem}>
                <label htmlFor="item">Item</label>
                <input 
                name="name"
                type="text" 
                value={itemData.name}
                onChange={handleChange}
                placeholder="eg.Soda.."
                required
                />
                <label htmlFor="quantity">Quantity</label>
                <input 
                name="quantity"
                type="number" 
                value={itemData.quantity}
                onChange={handleChange}
                placeholder="eg.200"
                required
                />
                <label htmlFor="price">Price</label>
                <input 
                name="price"
                type="number"
                value={itemData.price}
                onChange={handleChange}
                placeholder="eg.4"
                required
                />
                <button className="add-btn" >Add Item</button>
            </form>
            <div className="item-list">
                {itemList.map((item, idx) => (
                    <div className="items-table" key={idx}>
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">{item.quantity}</span>
                        <span className="item-price">{item.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="total-price">
                <label htmlFor="total">Grand Total: {total} </label>
            </div>
        </div>
        </div>
        </>
    )
}

export default ShoppingCart;