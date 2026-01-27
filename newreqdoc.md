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

---

## 2. Functional Requirements

### 2.1 System Scope Expansion

**2.1.1 Multi-Store, Nationwide Support (M)**

The CodePop platform must support deployment across multiple stores distributed throughout the United States. Each store operates as an independent unit while still participating in regional coordination for supply, logistics, and data synchronization. Stores must be able to function autonomously in day-to-day operations, even if other stores or regional systems are unavailable.

The system must allow for:
- Independent store configuration (inventory, machines, staff roles)
- Regional grouping of stores for supply and logistics coordination
- Expansion to new stores without requiring downtime or reconfiguration of existing locations
- Store-specific operational parameters and customization

**2.1.2 Decentralized Architecture (M)**

The system must operate using a decentralized architecture. There is no single central server that controls all stores nationwide. Instead:
- Each store maintains its own local operational data
- Stores communicate directly with other stores in the same region as needed
- Stores communicate directly with regional supply hubs
- Regional data synchronization must tolerate intermittent or unstable connectivity

In the event of connectivity loss:
- Local store operations (ordering, inventory tracking, machine operation) must continue uninterrupted
- Synchronization of data (inventory usage, maintenance logs, demand metrics) must resume automatically once connectivity is restored
- Conflicts during synchronization must be resolved using timestamp-based or priority-based reconciliation rules

### 2.2 Supply & Logistics System

**2.2.1 Supply Hubs (M)**

The system must support seven (7) regional supply hubs, each assigned to a specific geographic region:

- **Region A:** Chicago, IL
- **Region B:** New Jersey / New York
- **Region C:** Logan, UT
- **Region D:** Dallas, TX
- **Region E:** Atlanta, GA
- **Region F:** Phoenix, AZ
- **Region G:** Boise, ID

Each supply hub is responsible for managing and distributing ingredients, machine parts, and other consumables required for store operations.

Supply hubs must be capable of delivering to:
- Stores located within their assigned region
- Stores located in other regions, provided the destination store is within a 1000-mile delivery radius

The system must allow hubs to manage:
- Current stock levels
- Outgoing and incoming shipments
- Estimated delivery times
- Cross-region fulfillment when a closer hub lacks sufficient inventory

**2.2.2 Supply Coordination (M)**

Managers and logistics administrators must be able to coordinate supplies through multiple channels:
- Local store inventory tracking
- Shared local suppliers (e.g., regional syrup or CO₂ vendors)
- At least one assigned regional supply hub

The platform must provide a unified interface for viewing:
- Current store inventory
- In-transit shipments
- Hub availability and fulfillment capacity
- Supplier lead times

AI-assisted demand prediction must be used to forecast future supply needs. This prediction system must:
- Use historical usage data from individual stores and regions
- Support CSV-based data ingestion for historical records and external forecasting inputs
- Continuously update forecasts based on real-time usage trends

The system must generate actionable recommendations, such as:
- Suggested reorder quantities
- Optimal sourcing location (local supplier vs. supply hub)
- Recommended reorder timing to prevent shortages

### 2.3 Machine Maintenance Tracking

**2.3.1 Maintenance System Overview (M)**

Each store must track all operational machines used in drink preparation and fulfillment. For every machine, the system must store:
- Machine type and model
- Operational start date
- Current maintenance status
- Complete maintenance and repair history

This information must be available to:
- Store managers
- Regional maintenance coordinators
- Authorized logistics or technical administrators

**2.3.2 Maintenance Status Types (M)**

The system must support the following machine states:

- **normal:** Machine is operating within expected parameters
- **warning:** Machine is operational but exhibiting early indicators of potential failure
- **repair-start:** Machine has entered an active repair state
- **repair-end:** Repair has been completed and machine is ready for operation
- **error:** Machine has encountered a fault requiring attention
- **out-of-order:** Machine is not operational and cannot be used
- **schedule-service:** Machine is due for routine or preventive maintenance

Transitions between states must be logged automatically with timestamps and responsible personnel (when applicable).

**2.3.3 Repair Optimization (S)**

The system should optimize repair and maintenance schedules using AI-assisted planning. Optimization objectives include:
- Minimizing total technician travel time across stores
- Respecting maximum allowable time between service visits for each machine type
- Preventing machines in a **warning** state from exceeding safe operational thresholds

The optimization system should consider:
- Geographic location of stores
- Technician availability
- Severity and priority of machine issues
- Historical failure patterns


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
Create 7 supply hubs, one per region (A–G). One supply hub will by managed by a user with the `logistics_manager` role. A supply hub can delivber to any stores within their own region, or other regions within 1000 miles. 
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


## Nonfunctional Requirements

**Decentralized**
*(M)* There is no central server to manage stores, each store much communicate directly with other stores within their region. 

**Data Consistency** 
*(M)* With no central server, we must define how stores agree on the state of supplies. 

**Fault Tolerence**
*(S)* Each store must be able to operate autonomously if its connection to other stores or hubs is severed. Local maintenance tracking and sales must be cached locally and synchronized once the connection is restored.

**Auditability & Logging**
*(S)* The system must maintain an immutable transaction log at each node. Every action taken by a `logistics_manager` or `repair_staff` must be timestamped and cryptographically signed to prevent tampering.

**Responsive:**
*(M)* Responsive: The application must be responsive, providing an optimal user experience across a variety of devices, including desktops, tablets, and mobile devices, with seamless adaptation to different screen sizes and orientations.

**Error Messages:**
*(M)* The application must provide clear, informative error messages for user interactions, invalid inputs, and system errors. Error messages should be concise, easy to understand, and where applicable, include suggestions for resolution.


**Scalability:**
*(M)* The application must be designed to scale efficiently, handling an increasing number of user transactions and data volume without performance degradation, ensuring a consistent user experience. In addition it must not be limited to one store, it must be able to support many stores across the USA.
***Discoverability / Service Discovery ***
*(M)* When a new store opens in a region, how do the other stores find out it exists if there is no central registry? The application must include a Service Discovery mechanism. New store nodes must be able to broadcast their presence and "handshake" with existing regional peers automatically upon deployment.

**Cross Browser Capability:**
*(S)* The application must be compatible with the latest versions of major browsers, including Chrome, Firefox, Safari, and Edge, ensuring consistent functionality and user experience across all platforms.

**Security:**
*(M)* All sensitive data, including user credentials and payment information, and location data, must be encrypted using industry-standard encryption protocols, such as TLS (Transport Layer Security). Additionally, the application should adhere to best practices for secure coding and data handling to ensure the protection of all user information. All inter-store communications must be digitally signed. Every node must verify the sender's identity using a Public Key Infrastructure (PKI) before processing supply or maintenance updates.

**Accessible:**
*(S)* The application must comply with Web Content Accessibility Guidelines (WCAG) 2.1 to ensure that users with disabilities can navigate and use the application effectively. This includes avoiding problematic color combinations, such as red and green, and providing alternative text labels for color-based indicators.

**Reporting:**
*(S)* The system should include features for inventory management. It must automatically notify the manager when items are out of stock and generate detailed reports that can be sent to the developer for further analysis. Additionally, the system should provide the manager with financial reports, offering insights into revenue. This will ensure timely restocking, help in identifying inventory trends or potential issues, and provide a clear understanding of the store's financial performance


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

### 10. User Roles & Permissions (Updated)
**10.1 New Roles**

logistics_manager (M)
Manage supply distribution within a region
Coordinate deliveries between hubs and stores
Analyze supply usage via AI using CSV imports
Create and update supply schedules

repair_staff (M)
Manage machine repair schedules for assigned stores
Import repair schedules from CSV files containing:
Store address
Machine type (enumerated)
Operational start date
Machine status
Status date

super_admin (M)
Full access to all store locations and data nationwide

**10.2 Updated Existing Roles**

admin (M)
Access limited to own store
Manage user accounts
Unlock, disable, and delete users
Grant manager permissions

manager (M)
Access limited to own store
View inventory levels
View payments and revenue reports
Receive AI-generated inventory alerts

account_user (M)
Can order from any store
Suggested store based on:
Current location + pickup time, or
Preferred store
Preferences and order history retained

general_user (M)
Can place one-time orders
No data persistence

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
