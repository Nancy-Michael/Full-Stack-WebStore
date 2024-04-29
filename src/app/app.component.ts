import { Component, OnInit } from '@angular/core';
import { Cart } from './models/models';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
}
