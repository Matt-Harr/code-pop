# CodePop Requirements Document (Updated)

## 1. Introduction

**1.1 Overview of CodePop**
CodePop is an innovative beverage application that leverages AI, automation, and distributed systems to redefine soda customization and ordering. The platform supports mobile and desktop usage and is designed for minimal human intervention, relying on AI-driven inventory management, ordering, logistics coordination, and maintenance tracking.

**1.2 Purpose of This Document**
This document defines the complete functional, non-functional, business, and system requirements for CodePop. It aligns developers, stakeholders, and system architects on scope, priorities, and responsibilities, including newly introduced multi-store, logistics, and maintenance capabilities.

**1.3 MoSCoW Analysis**
Requirements are categorized as:

- **M** – Must Have  
- **S** – Should Have  
- **C** – Could Have  
- **W** – Won’t Have  

# Requirements
---

## Functional Requirements 

### 2. System Scope Expansion (New)
**2.1 Multi-Store, Nationwide Support** (M)
The platform must support multiple stores across the United States.
Each store operates independently while participating in regional coordination.

**2.2 Decentralized Architecture** (M)
There is no central server controlling all stores.
Stores communicate directly with:
Other local stores in the same region
Regional supply hubs
Regional data synchronization must tolerate intermittent connectivity.

### 3. Supply & Logistics System (New)
**3.1 Supply Hubs** (M)
The system must support 7 supply hubs, each assigned to a region:

Region A: Chicago, IL
Region B: New Jersey / NY
Region C: Logan, UT
Region D: Dallas, TX
Region E: Atlanta, GA
Region F: Phoenix, AZ
Region G: Boise, ID

Supply hubs can deliver to:

Stores in their own region
Stores in other regions within 1000 miles

**3.2 Supply Coordination** (M)
Managers and logistics administrators must coordinate supplies using:
Local store inventory
Shared local suppliers
At least one assigned regional supply hub
AI-assisted demand prediction must use historical usage data (CSV-based ingestion supported).

### 4. Machine Maintenance Tracking (New)
**4.1 Maintenance System** (M)
Each store must track:
Machine type
Operational start date
Maintenance status
Maintenance history

**4.2 Maintenance Status Types** (M)
Supported machine states:

normal
repair-start
repair-end
warning
error
out-of-order
schedule-service

**4.3 Repair Optimization** (S)
Repair schedules must be optimized to:
Minimize travel time
Respect maximum time between service visits
Prevent machines in warning state from exceeding allowed operational time


## Nonfunctional Requirements

### 6. Dashboards (Updated)
**6.1 Required Dashboards** (M)

Logistics Manager Dashboard
Regional supply levels
Hub-to-store routing
AI demand forecasts

Repair Staff Dashboard
Machine status by store
Repair schedules
Travel-optimized task list

Manager Dashboard (Updated)
Inventory grid
Cooler status and wait times
Order status (past, current, future)
Revenue and fulfillment stats

Admin & Super Admin Dashboards
User management
Store performance metrics
System-wide reports (super_admin only)

### 7. Test Data Requirements (New)
**7.1 Supply Hubs** (M)
Create 7 supply hubs, one per region (A–G)

**7.2 Stores** (M)
Region C: 20 stores
Neighboring regions (within 200 miles): minimum 5 stores per region

**7.3 Roles & Supplies** (M)
Assign:
One logistics_manager per hub (Regions A–G)
One repair_staff for Region C
Populate:
Supply inventories
Maintenance schedules
Machine status histories


## Business Requirements

### 8. Supply & Logistics System (New)
**8.1 Supply Coordination** (M)
Managers and logistics administrators must coordinate supplies using:
Local store inventory
Shared local suppliers
At least one assigned regional supply hub
AI-assisted demand prediction must use historical usage data (CSV-based ingestion supported).

### 9. Machine Maintenance Tracking (New)
**9.1 Repair Optimization** (S)
Repair schedules must be optimized to:
Minimize travel time
Respect maximum time between service visits
Prevent machines in warning state from exceeding allowed operational time


## User Requirements

### New User Requirements

**Updated Preferences**: (M) Users should be able to save their preffered location and get suggested new drinks based on existing user preferences and previous orders. This update will allow users to get their drinks from their preffered location or closest location to them. Also allowing users to get better suggested drink based on preferences and previous orders.

**Multi-store syncing**: (M) Users should be able to access their information from any store. And have the software suggest which location to buy from based on saved preferences and current location. This will allow users to pickup their orders from the nearest store. This also expands the availability at which users are able to order and pickup drinks.

**Software Reliability**: (M) The application should work with no central server. Instead the application server should be implemented with a decentralized architecture. With this change the user should still have a reliable experience using the software.

**Sufficient Supplies**: (M) The software must help store managers/administrators with coordinating supplies via supply hubs. To deliver supplies to store locations that are in need of supplies. Ensuring that users will always have sufficient supplies to complete orders. And allow users to order anything.

**Machine Up Time**: (M) The software must keep track of and schedule machine maintenance at each location. Allowing repair staff to perform maintenance on machines that require it. Ensuring that machine down time is kept to a minimum allowing user orders to be completed on time.

### Existing User Requirements

**Account creation:** *(M)* 
Users must be able to create an account or log in to the application using a combination of a username, password, and email address. This process includes setting up security measures such as email verification and password strength checks to protect user accounts from unauthorized access.

**Profile management:** *(M)* 
Users should be able to view and edit their profile information after initial sign-up. The profile management system should ensure that updates are reflected in real-time and maintain consistency across all parts of the application, including personalized recommendations and saved preferences.

**Favorite drinks:** *(M)* 
Users should be able to mark and view their favorite drinks. The application should provide an intuitive interface for users to manage their favorites, and ensure that this list is easily accessible for quick reordering and personalized recommendations.

**Edit preferences:** *(S)* 
Users should be able to customize their drink preferences. This feature will allow users to refine their experience based on individual tastes, ensuring that drink suggestions and potential promotional offers are tailored to their specific likes and dislikes.

**First-time user tutorial:** *(S)* 
New users should be guided through a tutorial when they first use the application. The tutorial should not only introduce the basic functionalities but also highlight unique features of the app, ensuring a smooth onboarding experience and helping users get the most out of the application from the start. 

**Choose time for drink to be ready:** *(S)* 
Users should be able to select a specific time for their drink to be ready. This feature aims to provide convenience for those users who do not want to use geolocation functionality by allowing them to plan ahead and ensure their drink is prepared and available precisely when they want it, reducing wait times and improving overall satisfaction.

**Rate drinks:** *(S)* 
Users should be able to rate the drinks they purchase. The rating system should enable users to provide detailed feedback on their experience, which will be used to enhance the quality of the drinks and inform other customers about popular choices and potential improvements.

**Chat functionality with AI support staff:** *(C)* 
Users should be able to chat with an AI-powered support staff for assistance. The AI support staff should be capable of handling a wide range of queries and issues, providing instant help and guidance while learning from reactions to improve its responses over time.

**Loyalty program:** *(C)* 
A loyalty program should be available to reward repeat customers.This program should offer various incentives such as points, discounts, or exclusive offers, fostering customer retention and encouraging continued patronage by recognizing and rewarding frequent visits.

**Social media functionality:** *(C)* 
The application should integrate with social media platforms to enhance user engagement and sharing. Users should be able to seamlessly share their experiences and favorite drinks, as well as interact with the soda shop’s social media presence, creating a sense of community and boosting brand visibility.

### 10. User Roles & Permissions (Updated)
**10.1 New Roles**

- `logistics_manager`
  - Manage supply distribution within a region
  - Coordinate deliveries between hubs and stores
  - Analyze supply usage via AI using CSV imports
- `repair_staff`
  - Manage repair schedules for machines they are in charge of at store location they manage
  - Import repair schedules from CSV file containing:
    - store location : address field
    - machine type : enumearted code of machine types
    - machine status : one of:
      - `normal` : machine operating normally
      - `repair-start` : servicing started; machine is off-line
      - `repair-end` : servicing finished
      - `warning` : non-critical issue; operational but needs repair soon
      - `error` : critical issue; requires repair within a week
      - `out-of-order` : not operational
      - `schedule-service` : operational but needs scheduled maintenance within one month
    - status date : date when the status was recorded
  - Optimize repair schedule to minimize travel time, with constraints including:
    - maximum time allowed between service visits
    - macimum time a machine with a warning can remain operational before shutting down without service
- `super_admin`
  - Can access data for any store locations

**10.2 Updated Existing Roles**
- `admin`
  - Can access their own store information only, with the same access level
  - Has access to manage user account data
  - Has ability to update/remove/unlock user accounts
  - Has the ability to add manager accounts/grant permissions
- `manager`
  - Can access their own store information only, with the same access level
  - Has access to data such as stock inventory
  - Has access to user payments
  - Has access to revenue reports
- `account_user`
  - Can access their own information from any store
  - Software will suggest which location to buy from based on:
    - the user's current location and preferred pickup time, or
    - the uers's preferred location
  - Software remembers previous orders and suggests new drinks based on preferences
- `general_user`
  - User can use the app to order drinks on a single time basis without creating an account
  - This user's data and preferences aren't saved in the system

### Use Case Stories

**Logistics Manager**
- *(M)* As a Logistics Manager, I want to view real-time inventory levels across all stores in my assigned region so that I can make informed supply distribution decisions.
- *(M)* As a Logistics Manager, I want to assign deliveries from my regional supply hub to stores within and outside my region (up to 1000 miles) so that supply shortages are prevented.
- *(M)* As a Logistics Manager, I want to coordinate supply transfers between local stores and shared regional suppliers so that demand spikes can be handled without over-reliance on a single hub.
- *(M)* As a Logistics Manager, I want to import historical supply usage data from CSV files so that AI-assisted demand prediction can generate accurate forecasts.
- *(M)* As a Logistics Manager, I want to generate and update supply schedules for stores in my region so that deliveries align with predicted demand and inventory thresholds.
- *(S)* As a Logistics Manager, I want to receive AI-generated alerts when projected demand exceeds available regional supply so that I can proactively adjust delivery plans.”
- *(S)* As a Logistics Manager, I want to visualize hub-to-store routing on a regional dashboard so that I can optimize delivery efficiency and reduce travel distance.
- *(C)* As a Logistics Manager, I want to compare historical demand forecasts against actual supply usage so that I can evaluate the accuracy of AI predictions.
- *(W)* As a Logistics Manager, I want to export supply schedules and demand reports to CSV so that I can share them with external logistics partners if needed.

**Account user stories:**
- *(M)* As an account user I want to be able to easily and securely sign in to my account to access my drink history and order drinks 
- *(M)* As an account user, I want to know that my private data such as payment information and geolocation is being protected if I choose to share it. 
- *(S)* As an account user, I want to have drinks recommended to me based on my preferences.
- *(M)* As an account user, I want the app to be visually pleasing.
- *(M)* As an account user I want to be able to see all possible combinations of syrups, sodas, and add-ins so I can craft my drink. 
- *(M)* As an account user, I want to be able to save my favorite drinks so I can order them easily in the future
- *(M)* As an account user, I want to be able to have my drink fresh and ready for me right as I arrive to pick it up. 
- *(S)* As an account user, I want the option to deny access to my geolocation and instead choose a time for my drink to be ready. 
- *(M)* As an account user, I want to receive a notification when my soda is ready to pick up. 
- *(M)* As an account user, I want to be able to add payment options to my account so I can pay through the app when I order my drinks.
- *(M)* As an account user, I want to be refunded if I cancel my drink order. 
- *(C)* As an account user, I want to be able to rate the sodas I have tried out of 5.
- *(C)* As an account user, I want AI to use my drink ratings to recommend  future soda combinations.
- *(M)* As an account user, I want to be able to pay for my drink on the application when I order it.
- *(C)* As an account user, I want to be able to lodge complaints. 
- *(M)* As an account user, I want to be able to add and remove preferences
- *(M)* As an account user, I want to be able to dislike ingredients so they aren’t recommended to me. 
- *(C)* As an account user, I want to be able to share my drinks on social media. 
- *(S)* As an account user, I want access to a seasonal drink menu for inspiration when making my own drinks. 

**General user stories:**
- *(M)* As a general user, I want to be able to order drinks from the soda shop without having an account
- *(M)* As a general user I want to be able to create personalized drinks to order
- *(S)* As a general user, I want to be able to see drink suggestions based on popular drinks so I have ideas to order
- *(M)* As a general user I want to be able to see all possible combinations of syrups, sodas, and add-ins so I can craft my drink.
- *(S)* As a general user, I want to receive a notification when my soda is ready to pick up.
- *(M)* As a general user, I want to be able to receive a refund if I cancel my order. 
- *(S)* As an account user, I want access to a seasonal drink menu for inspiration when making my own drinks. 

**Admin User stories**
- *(M)* As an admin, I want to be able to keep track of inventory.
- *(M)* As an admin, I want to be able to access certain user data such as the number of user accounts.
- *(M)* As an admin, I want to be able to see and keep track of the cost of inventory and maintenance of the shop.
- *(M)* As an admin, I want to be able to see how much money the shop is bringing in.
- *(M)* As an admin, I want to be able to see general and account user complaints.
- *(S)* As an admin, I want to receive all available data in the form of easily understandable and regular reports.
- *(M)* As an admin, I want the ability to manage user accounts. This includes overriding locked accounts, disabling accounts, and deleting user accounts.
- *(M)* As an admin, I want to be able to add permissions to manager accounts.

**Manager User stories**
- *(S)* As a manager, I want to be able to see store revenue reports from the database.
- *(M)* As a manager, I want to be notified when inventory is low. 
- *(S)* As a manager, I want to be able to order more inventory when it is low.
- *(M)* As a manager, I want to be able to see inventory and usage data pertinent to running the store in the form of regular reports.

**General system stories**
- *(M)* As a user, I want all my options to be easily accessible and useful. 
- *(M)* As a user, I want simple and user-friendly options for making soda combinations, rating my sodas, and ordering sodas.
- *(M)* As a user, I want a safe and secure platform that ensures my data, especially my geolocation and email, is protected. 
- *(S)* As a user, I want the platform to be accessible according to WCAG standards of at least an “A”. 
- *(S)* As a user, I want a place I can lodge complaints and get helpful feedback.

---

## 11. Out of Scope (Unchanged – W)
- Global trend-based inventory forecasting
- Shared user accounts
- Multi-location support in v1 (removed – now supported)
- Refunds after drink creation
- Stored-value wallets
- Gift cards
- Cash payments

---

## 12. Summary
This update expands CodePop from a single-location system into a **nationwide, decentralized, AI-driven platform** with logistics coordination, maintenance optimization, and role-based operational control—while preserving the original customer-focused ordering experience.
