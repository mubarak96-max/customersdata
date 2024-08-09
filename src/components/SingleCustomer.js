import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const SingleCustomer = ({
  name,
  email,
  phone,
  saleAmount,
  saleType,
  books
}) => {
  return (
    <Card className="card" sx={{ marginY: 2 }}>
      <CardContent>
        <Typography sx={{ color: "black" }}>Name: {name}</Typography>
        <Typography sx={{ color: "black" }}>Email: {email}</Typography>
        <Typography sx={{ color: "black" }}>Phone: {phone}</Typography>

        {saleType === "Free Books" ? (
          <Typography sx={{ color: "black" }}>Taken free books</Typography>
        ) : (
          <Typography sx={{ color: "black" }}>Bought books</Typography>
        )}

        {saleType === "Selling" && (
          <Typography sx={{ color: "black" }}>
            Sale Amount: AED {saleAmount}
          </Typography>
        )}

        {saleType === "Free Books" && (
          <Typography sx={{ color: "black" }}>Books Taken: {books}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SingleCustomer;
