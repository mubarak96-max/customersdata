import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

const SingleCustomer = ({
  name,
  email,
  phone,
  saleAmount,
  saleType,
  books,
  deleteRecord,
  id
}) => {
  return (
    <Card className="card" sx={{ marginY: 2 }}>
      <CardContent>
        <Typography sx={{ color: "black" }}>Name: {name}</Typography>
        <Typography sx={{ color: "black" }}>Email: {email}</Typography>
        <Typography sx={{ color: "black" }}>Phone: {phone}</Typography>

        {saleType === "Free Books" ? (
          <Typography sx={{ color: "darkblue", fontWeight: 700 }}>
            Taken free books
          </Typography>
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

      <div className="flex flex-row mt-3">
        {/* <Button size='small' onClick={() => editVideo(video?.id)}>
          <div className='flex items-center px-3 py-2 space-x-1 text-blue-500 border border-blue-500 rounded-md w-fit hover:text-white hover:bg-blue-700 hover:cursor-pointer'>
            Edit
          </div>
        </Button> */}
        <Button size="small" onClick={() => deleteRecord(id)}>
          <div className="flex items-center px-3 py-2 space-x-1 text-red-500 border border-red-500 rounded-md w-fit hover:text-white hover:bg-red-700 hover:cursor-pointer">
            Delete
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default SingleCustomer;
