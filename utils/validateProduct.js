//product validation
export const validateProduct = (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).json({ success: false, message: "Product name is required" })
    }
    if (!req.body.price) {
        return res.status(400).json({ success: false, message: "Price is required" })
    }
    if (!req.body.description) {
        return res.status(400).json({ success: false, message: "Description is required" })
    }
    if (!req.body.stockQty) {
        return res.status(400).json({ success: false, message: "Stock Qty is required" })
    }
    next();
}