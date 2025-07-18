import React from "react";
import { useSelector } from "react-redux";

function CartDrawer({ isOpen, onClose }) {
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "visible" : "invisible pointer-events-none"}`}
      style={{ background: isOpen ? "rgba(0,0,0,0.3)" : "transparent" }}
    >
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">My Basket <span className="text-base font-normal text-gray-500">({items.length} item{items.length !== 1 ? 's' : ''})</span></h2>
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Close</button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto" style={{ minHeight: 200 }}>
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-24">Your basket is empty</div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id + (item.size || "") + (item.color || "") } className="flex items-center gap-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">Size: {item.size || "-"}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      Color:
                      <span className="inline-block w-4 h-4 rounded-full border border-gray-300 align-middle" style={{backgroundColor: item.color === 'Brown' ? '#8B4513' : item.color === 'Blue' ? '#1E90FF' : item.color === 'Black' ? '#000' : '#eee'}}></span>
                      {item.color || "-"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${item.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Subtotal Amount:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition" disabled={items.length === 0}>
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer; 