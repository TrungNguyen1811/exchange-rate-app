# Exchange Rate Project

## 1. Project Goal
**Exchange Rate** is a web application that displays and compares popular currency exchange rates.  
Main objectives:  

- Display daily currency exchange rates.  
- Compare exchange rates between countries or top currencies.  
- View historical exchange rates by datetime.  

The application is built with **JavaScript** and **Parcel**, using a **modular structure** for easy maintenance and scalability.

---

## 2. Architecture & Folder Structure main

src/
├─ js/
│ ├─ controller.js # Manages app flow, connects View & Model
│ ├─ model.js # Handles API requests, data processing, and rate calculations
│ └─ view/ # UI components
│ ├─ compareRateNation.js # Compare exchange rates between countries
│ ├─ submitExchangeRate.js # Form to submit new exchange rates
│ ├─ submitTimeHistory.js # Form to submit historical rate data
│ └─ View.js # Base class for view components
└─ index.html # Entry point of the application

**Workflow:**

1. Users interact with the UI (`view`).  
2. `controller.js` handles events and communicates with `model.js` for data processing.  
3. Results are returned to the `view` for display.

---

## 3. Key Modules

| Module | Function |
|--------|---------|
| `controller.js` | Coordinates data flow between view and model |
| `model.js` | Handles API calls, data processing, and rate calculations |
| `view/compareRateNation.js` | Compares exchange rates between countries |
| `view/submitExchangeRate.js` | Form to submit new exchange rates |
| `view/submitTimeHistory.js` | Form to submit historical exchange rates |
| `view/View.js` | Base class for view components |

---

## 4. Installation & Running

1. Install dependencies:
npm install

2. Run in development mode:
npm run dev

3. Build the project for deployment:
npm run build

4. Clear Parcel cache if build errors occur:
rm -rf .parcel-cache
npm run build

---

## 5. Important Notes
- Parcel is case-sensitive, especially on Linux/Mac and Vercel.
- Always run builds from the project root for imports to work correctly.
- Clear the Parcel cache when renaming files or changing folder structure.
- Modules follow the Single Responsibility Principle for easy extension and maintenance.