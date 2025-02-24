const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// API Route (modify based on project requirements)
app.post("/allocate", (req, res) => {
    const { investors, total_allocation } = req.body;
    if (!investors || !total_allocation) {
        return res.status(400).json({ error: "Invalid input" });
    }

    let totalRequested = investors.reduce((sum, inv) => sum + parseFloat(inv.requested_amount), 0);
    let allocationResults = investors.map(inv => {
        let proportion = parseFloat(inv.requested_amount) / totalRequested;
        return {
            investor_id: inv.investor_id,
            allocated_amount: total_allocation * proportion
        };
    });

    res.json(allocationResults);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
