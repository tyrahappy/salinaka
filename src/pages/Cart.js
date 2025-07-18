import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);

  return (
    <div className="container mx-auto py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Product</th>
                <th className="py-2 text-left">Size</th>
                <th className="py-2 text-left">Color</th>
                <th className="py-2 text-center">Quantity</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id + (item.size || "") + (item.color || "") } className="border-b">
                  <td className="py-2 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <span className="font-semibold">{item.name}</span>
                  </td>
                  <td className="py-2">{item.size || "-"}</td>
                  <td className="py-2">
                    <span className="inline-block w-5 h-5 rounded-full border border-gray-300 align-middle mr-2" style={{backgroundColor: item.color === 'Brown' ? '#8B4513' : item.color === 'Blue' ? '#1E90FF' : item.color === 'Black' ? '#000' : '#eee'}}></span>
                    {item.color || "-"}
                  </td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-xl font-bold">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

export default Cart; 