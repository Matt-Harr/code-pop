# CodePop Requirements Document (Updated)

## 1. Introduction

### 1.1 Overview of CodePop
CodePop is an innovative beverage application that leverages AI, automation, and distributed systems to redefine soda customization and ordering. The platform supports mobile and desktop usage and is designed for minimal human intervention, relying on AI-driven inventory management, ordering, logistics coordination, and maintenance tracking.

### 1.2 Purpose of This Document
This document defines the complete functional, non-functional, business, and system requirements for CodePop. It aligns developers, stakeholders, and system architects on scope, priorities, and responsibilities, including newly introduced multi-store, logistics, and maintenance capabilities.

### 1.3 MoSCoW Analysis
Requirements are categorized as:

- **M** – Must Have  
- **S** – Should Have  
- **C** – Could Have  
- **W** – Won’t Have  

---

## 2. System Scope Expansion (New)

### 2.1 Multi-Store, Nationwide Support (M)
- The platform must support **multiple stores across the United States**.
- Each store operates independently while participating in regional coordination.

### 2.2 Decentralized Architecture (M)
- There is **no central server** controlling all stores.
- Stores communicate directly with:
  - Other local stores in the same region
  - Regional supply hubs
- Regional data synchronization must tolerate intermittent connectivity.

---

## 3. Supply & Logistics System (New)

### 3.1 Supply Hubs (M)
- The system must support **7 supply hubs**, each assigned to a region:
  - Region A: Chicago, IL  
  - Region B: New Jersey / NY  
  - Region C: Logan, UT  
  - Region D: Dallas, TX  
  - Region E: Atlanta, GA  
  - Region F: Phoenix, AZ  
  - Region G: Boise, ID  

- Supply hubs can deliver to:
  - Stores in their own region
  - Stores in other regions within **1000 miles**

### 3.2 Supply Coordination (M)
- Managers and logistics administrators must coordinate supplies using:
  - Local store inventory
  - Shared local suppliers
  - At least one assigned regional supply hub
- AI-assisted demand prediction must use **historical usage data** (CSV-based ingestion supported).

---

## 4. Machine Maintenance Tracking (New)

### 4.1 Maintenance System (M)
- Each store must track:
  - Machine type
  - Operational start date
  - Maintenance status
  - Maintenance history

### 4.2 Maintenance Status Types (M)
Supported machine states:
- `normal`
- `repair-start`
- `repair-end`
- `warning`
- `error`
- `out-of-order`
- `schedule-service`

### 4.3 Repair Optimization (S)
- Repair schedules must be optimized to:
  - Minimize travel time
  - Respect maximum time between service visits
  - Prevent machines in `warning` state from exceeding allowed operational time

---

## 5. User Roles & Permissions (Updated)

### 5.1 New Roles

#### logistics_manager (M)
- Manage supply distribution within a region
- Coordinate deliveries between hubs and stores
- Analyze supply usage via AI using CSV imports
- Create and update supply schedules

#### repair_staff (M)
- Manage machine repair schedules for assigned stores
- Import repair schedules from CSV files containing:
  - Store address
  - Machine type (enumerated)
  - Operational start date
  - Machine status
  - Status date

#### super_admin (M)
- Full access to **all store locations and data nationwide**

---

### 5.2 Updated Existing Roles

#### admin (M)
- Access limited to **own store**
- Manage user accounts
- Unlock, disable, and delete users
- Grant manager permissions

#### manager (M)
- Access limited to **own store**
- View inventory levels
- View payments and revenue reports
- Receive AI-generated inventory alerts

#### account_user (M)
- Can order from **any store**
- Suggested store based on:
  - Current location + pickup time, or
  - Preferred store
- Preferences and order history retained

#### general_user (M)
- Can place one-time orders
- No data persistence

---

## 6. Dashboards (Updated)

### 6.1 Required Dashboards (M)
- **Logistics Manager Dashboard**
  - Regional supply levels
  - Hub-to-store routing
  - AI demand forecasts
- **Repair Staff Dashboard**
  - Machine status by store
  - Repair schedules
  - Travel-optimized task list
- **Manager Dashboard (Updated)**
  - Inventory grid
  - Cooler status and wait times
  - Order status (past, current, future)
  - Revenue and fulfillment stats
- **Admin & Super Admin Dashboards**
  - User management
  - Store performance metrics
  - System-wide reports (super_admin only)

---

## 7. Test Data Requirements (New)

### 7.1 Supply Hubs (M)
- Create **7 supply hubs**, one per region (A–G)

### 7.2 Stores (M)
- Region C: **20 stores**
- Neighboring regions (within 200 miles): **minimum 5 stores per region**

### 7.3 Roles & Supplies (M)
- Assign:
  - One logistics_manager per hub (Regions A–G)
  - One repair_staff for Region C
- Populate:
  - Supply inventories
  - Maintenance schedules
  - Machine status histories

---

## 8. Out of Scope (Unchanged – W)
- Global trend-based inventory forecasting
- Shared user accounts
- Multi-location support in v1 (removed – now supported)
- Refunds after drink creation
- Stored-value wallets
- Gift cards
- Cash payments

---

## 9. Summary
This update expands CodePop from a single-location system into a **nationwide, decentralized, AI-driven platform** with logistics coordination, maintenance optimization, and role-based operational control—while preserving the original customer-focused ordering experience.