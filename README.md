# bamazon

## Synopis

***

An interactive shopping node app where MySQL and Node.JS are used to:
1) Allow users to purchase items as a customer;
2) View, track, and update the product inventory as a manager;
3) Track total sales by departmnet, and maintain departments as the supervisor.

### Bamanzon Customer Portal

***

The Bamazon Customer Portal allows users to view the current items available for puchase. The user will be prompted to enter the item id# and how many items they wish to purchase. If the item is in stock, the order will be completed and the user will see the total amount of their purchase.

![Customer Portal](screenshots/customer.JPG)

### Bamazon Manager Portal

***

The Bamazon Manager Portal allows users to view and edit the inventory of the store. The user will be prompted to choose from the following options:

* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product
* Exit

![Manager Menu](screenshots/managerMenu.JPG)

#### Manager Option 1

***

The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, the price of the product, and how much stock is left for that product.

![Manager Option 1](screenshots/managerOption1.JPG)

#### Manager Option 2

***

The second option allows the user to see a list of all inventory items that have less than 5 items in stock. If there are no products that meet this criteria, the user will see an empty table.

![Manager Option 2](screenshots/managerOption2.JPG)

## Installation

***

1. Clone the git repository - `git clone https://github.com/sharon-f-lewis/bamazon.git`
1. cd bamazon
1. npm install

## License

***

Copyright @2018 - Sharon F. Lewis