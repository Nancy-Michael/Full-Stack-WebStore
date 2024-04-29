import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void{
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 was added to the cart', 'Ok', { duration: 3000 })
  }
  removeQuantity(item:CartItem): void{
    let itemForRemove: CartItem | undefined;

    let filteredItems= this.cart.value.items.map((_item) => {
      if (_item.id===item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemove = _item;
        }
      }
      return _item;
    })
    if (itemForRemove) {
      filteredItems = this.removeOneItem(itemForRemove,false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 Item removed from cart.', 'Ok', {
      duration: 3000
    });
  }
  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity).
      reduce((prv, curr) => prv + curr, 0)
  }
  clearCart() {
    this.cart.next({ items: [] });
    this._snackBar.open('The Shopping Cart is empty','Ok',{duration:3000})
  }
  removeOneItem(item: CartItem, Update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items
      .filter((_item) => _item.id !== item.id);

    if (Update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('Item was removed', 'Ok', {
        duration: 3000
      });
    }
    return filteredItems;
  }
}
