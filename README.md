# Steps to Cleaning up Tags in Quicken

## Overview of Organization Methods

Why would we be so concerned about the organization of our transactions?  So that when we budget money for the year, we can pay ourselves first, and then determine the amount of disposable income there is so we stay in the black and don't end up in the red; because you can eliminate necessary spending if necessary since you can identify it from your past history.  

For example; if you take several years of transnational history that is organized correctly, you can better determine what you will spend in the upcoming year. If you're a good driver, and in each of the past 3 years you've always spent, on average (sum the three years and divide by 3), $850 on your yearly car insurance payment, it's likely that you'll spend that much again the next year, and thus you'll be able to add that to the pay-yourself-first balance for the upcoming year.

There are two forms of transaction organization in Quicken:
- Categories  
- Tags 
  
Categories help to break down the totals for the past history of a particular type of income or expense.  And tags help you to identify the source of the transaction.  

### Categories
Should be thought of as a hierarchy, a tree; similar to a folder structure in a file system, where the categories are the folders and the files are the transactions.  

Also similar to a file system the structure of the folders form a path; for example `C:\utilities\water\sewage\` or `/utilities/water/sewage/`, but in Quicken you would categorize your **transaction** in its' **category field** like this `utilities:water:sewage` to specify that a **transaction** lives in that folder.

Categories should specify categories of income and expense (**transactions**) and **not** *who* or *what* spent the money.

### Tags
Tags help you to identify the source of the transaction.  They help to idenify a cross cutting source of a transaction; for instance if you are in a family, each member might have a tag on transactions which are: money that they made, or money that they spent.  

###Using Categories and Tags Together
If you want to track all car related transactions you might have the following category path: `vehicles` which would contain all of your car related expenses; inside this folder would contain the sub-folders for different maintaince categories for example: `vehicles:repairs`, `vehicles:oil change`, `vechicles:tires`, `vehicles:windsheild wipers`, `vehicles:head lights`. To determine which vehicle the expense applies to, the vehicle itself would have a tag of its' own, which would then be applied to any and all transactions in the `vehicle` category and its sub categories, to differentiate it from other cars that may have had repairs related to the same sorts of transactions.  If someone in the family owns that car, then they should also have their name tag applied to it.

## Correcting Errors in Organization

Now nobody, especially new users of Quicken, are immune to mis-using the Category / Tag functionality.  When I first started using Quicken 11 years ago, I didn't even realize the differences between categories and tags, or even the fact that categories are a hierarchical tree structure, much like a file system.  So I just tried to keep the tags and the categories the same, for similar transactions; but I didn't end up with the outcome I wanted because I had no way of seeing the category heirarchy as a whole, and I didn't have any experience using the reporting software in Quicken, I just knew it was important to keep track of your transactions, I didn't even know about paying yourself first in budgeting.

However, now that I understand the Organized structure, I'm able to export my data and count up the unique categories and tags, and identify problem areas so that the categories as a whole can be more easily summarized into data that can be used to pay-yourself-first and budget for the future.

## Correcting Errors in Organization

### Step 1: Export all Transactions Out of Quicken

### Step 2: Import Transactions into MySQL

### Step 3: Run a Query to `count(*)` the number of transactions in each unique category

### Step 4: Run a Query to `count(*)` the number of transactions in each unique tag.

### Step 5: Export the results of both Queries to a csv file.

### Step 6: Place them in the `csv` folder

### Step 7: Run my script and look at the output

On your computer create two spreadsheets, one for tags and one for categories.

#### Tags that do not have an equivalent category

In the tags spreadsheet add a worksheet, with 4 tabs; in the first worksheet, label it output and put the tags listed as not having an equivalent category.

Name the next 3 worksheets as the following: `fixed tags`, `mispellings`, `tags that should be categories`

Move back and forth between the first worksheet and the appropriately named one for each of the steps below:

These are tags that do not have the same name as a category; they could be:  

1. Tags you want to keep, that should be tags and not categories
   - Leave these alone, but be sure you know which ones they are, 
   - It doesn't hurt to define rules somewhere about what tags are considered valid.
   - From here on out we'll refer to these as **fixed tags**.  You will likely be merging other tags into these tags.
1. Mis-spellings of tags that you want, but that you typed in hastily; you'll want to use Quicken to rename these tags to match the existing fixed.
   -  `adny` when the tag you really meant was `andy`
1. Tags that should be categories
   - Be sure to write these down for later, and remeber that they don't have an equivalent category, so you'll have to figure out which one it should belong to if it doesn't already, but only write the equivalent category on the spreadsheet next to the tag name.

### `Duplicate Categoires` and `Counts and Paths to Duplicate Categories`
Get your second spreadsheet for Categories and create the following two worksheets, labeled `dup_cat_count` and `paths_to_dup` accordingly.  In these place the output.

Basically what the script does to your category paths is it goes to the end of the category path and nibbles off just the last category name, to look for other paths that have the same name.  This way we can idenify duplicates.
