import { Component } from '@angular/core';
import { Cart, CartItem } from '../../models/models';
import { CartService } from '../../services/cart.service';
import { _COALESCED_STYLE_SCHEDULER } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Cart = {
    items: [{
     product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 2,
    id:1,
    }, {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 1,
      id:2,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 2,
        id:3,
    }]
  }
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService:CartService,private http:HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }
  getTotalPrice(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void{
    this.cartService.clearCart();
  }
  onRemoveOneItem(item:CartItem):void{
    this.cartService.removeOneItem(item);
  }
  onAddQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item:CartItem):void {
    this.cartService.removeQuantity(item);
  }
  onCheckout(): void{
    this.http.post('http://localhost:4242/checkout', {
      items:this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51OiIJWHxXrGxzrVq4YgWJqlh2WETT382XEvdtr42WolYY8m5V0xXsSe6E5CyJPia8BwwjOceA85EiLNfh5LgO07r009wYZzMee');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
