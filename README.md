# Expense Tracker
## How to Run
After cloning repo, install dependencies and run dev
The web application will run on local host, with default port 5173
http://localhost:5173/
```
npm install
npm run dev
```

## Summary of Project
The three sections of the project are all on one page. User Management is the first section, then Expense Mangement, and finally Category Totals.

### User Management
To create a user, both name fields to need to be filled before clicking the create button.

To edit a user, a user must first be created to select a unique user ID before clicking the edit button. Any field can be modified, but original values are not populated so to prevent unwanted data from changing, the original values must be filled if you want it unchanged.

To delete a user, a user must first be created. The user will be shown in the table with a delete button at the end of the row. Once this button is clicked, the user is removed from the application.

### Expense Management
To create an expense, a user must first be created to assign the expense. All fields to need to be filled before clicking the create button. The cost is a whole number.

To edit an expense, an expense must first be created to select a unique expense ID. Any field can be modified, but original values are not populated so to prevent unwanted data from changing, the original values must be filled if you want it unchanged.

To delete an expense, an expense must first be created. The expense will be shown in the table with a delete button at the end of the row. Once this button is clicked, the expense is removed from the application.

### Total Cost by Category
Category Totals are shown with their respective categories. 

## Design of project
Some design decision taken are: Categories are in a non-editable list. User IDs and Expense IDs are generated by keeping count of users and expenses. The count will always be increasing, so there will be no overlap of previously used IDs.

To accommodate for a large data set for both users and expenses, certain design considerations were taken. 

React Window is used to virtualize the tables. This allows for only items currently visible to be render. This allows for better performance when there are many rows in the tables.

Data was stored to allow for constant time complexity for certain actions.

### Data Models

#### Users
Stored users in an object. Where key is user ID and value is object that contains user information. By using this method, there is constant time lookup of user information if given a user ID. A user running expense total is kept with user to allow for constant time access. A list of expense IDs is kept with user to be used for quick access of user's expenses.

Example user data:
```
{
    '2': {
        'id': '2',
        'first': 'Bob',
        'last': 'Smith',
        'total': '30',
        'expenses': [2, 5, 66]
    },
    '55': {
        'id': '55',
        'first': 'Joan',
        'last': 'Wilson',
        'total': '88',
        'expenses': [9, 3, 10]
    },
    ...
}
```

### Expenses
Stored expenses in an object. Where key is expense ID and value is object that contains expense information. By using this method, there is constant time lookup of user information if given a expense ID. The user ID that is assign to the expense is stored in the object. The category of the expense is stored as an index corresponding to array of pre-defined categories. 

Example expense data:
```
{
    '1': {
        'id': '1',
        'userId': '22',
        'category': '1',
        'cost': '30',
        'description': 'Dinner'
    },
    '3': {
        'id': '3',
        'userId': '32',
        'category': '6',
        'cost': '299',
        'description': 'Books'
    },
    ...
}
```

### Total Cost By Category
Categories are stored in an array. The index corresponds with the index in the array of categories. An array was chosen because the list of categories is pre-defined and unchanged, so the elements and their indexes will stay constant. The total cost of a given category is stored in the index of the array. For example in the example below, Meals is index 0, the expense data at index 0 is 22, therefore the meals category has a total cost of 22.  The index is used as the category's 'ID'.

List of categories:
```
['Meals', 'Rent', 'Recreational', 'Utilities', 'Transportation', 'Health', 'Subscriptions' ,'Other']
```
Example expense data:
```
[22, 0, 5, 2097, ...]
```

### Time Complexity
The data used in this application is stored so that in general, lookup will be constant time. The trade off is that everytime there is a change in user or expense data, the totals and expenses tracked will need to be recalculated or updated.

#### Create User
O(1), user data is added to state object.

#### Edit User
O(1), user's data is replaced with updated user data. The lookup is constant time because user ID is the key.

#### Delete User
O(1), will delete key-value pair from users data from user ID. The category totals will be updated and because there is a constant number of categories it will be constant time. The expense ID's are stored with the user, so the user's expenses can be quickly deleted because lookup of the expense will be constant time. Deleting expenses will be O(N) where N is number of the user's expenses.

#### View User Total Expenses
O(1), user's total is stored with their data and updated each time a new expense is added. The lookup is constant because user data is quickly access with user ID in the object.

#### Create Expense
O(1), expense data is added to state object. Will need to lookup user and add expense to user's total and expense list but this is constant lookup with user IDs as keys. Category total will need to be calculated but is a constant time add with category id.

#### Edit Expense
O(1), to update expense state. However will need to update user's total and expenses and also the category's total. 

#### Delete Expense
O(1) to delete from expense state. However will need to remove from user's expense list so will be O(N) where N is the number of expenses the user has. The category total will need to be updated but will be constant time.

### View Total Cost by Category
O(1), total cost by category is stored in array for quick lookup. The trade off is that everytime an expense or user is added, removed or edited, then the category total will need to be recalculated.

