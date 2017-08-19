import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    price: number;
    item_name: string;
    item_desc: string;

    constructor() { }

    ngOnInit() {
    }

    openCheckout(){
        let handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_PU5QUlzSyDXUe4Lc5LLOCu3F',
            locale: 'auto',
            token: function(token: any){

            }
        });

        handler.open({
            name: this.item_name,
            description: this.item_desc,
            amount: this.price
        });
    }
}
