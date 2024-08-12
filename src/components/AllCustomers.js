import React, { useEffect, useState } from "react";
import SingleCustomer from "./SingleCustomer";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { format, startOfDay, endOfDay } from "date-fns";
import Swal from "sweetalert2";

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      try {
        let arr = [];

        const promsRef = collection(db, "customers");

        const startDate = startOfDay(selectedDate);
        const endDate = endOfDay(selectedDate);

        const q = query(
          promsRef,
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, data: doc.data() });
        });

        // Calculate the total sale amount
        const total = arr.reduce((sum, customer) => {
          const amount = parseFloat(customer.data.saleAmount) || 0;
          return sum + amount;
        }, 0);

        setCustomers(arr);
        setTotalSaleAmount(total);
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, [selectedDate]); // Removed 'loading' from dependency array

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const deleteRecord = async (iDToDelete) => {
    console.log("id", iDToDelete);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "customers", iDToDelete));
          Swal.fire("Deleted!", "Record has been deleted.", "success");
          // Trigger data refresh
          setSelectedDate(new Date(selectedDate)); // Refresh the data by updating the selectedDate
        } catch (error) {
          console.error("Error deleting document:", error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the record.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Select Date"
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">
          Total Sales Amount: {totalSaleAmount}
        </Typography>
      </Box>

      {loading && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: 100,
            top: "50%",
            left: "50%"
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {customers?.map((customer) => (
        <SingleCustomer
          id={customer.id}
          key={customer.id}
          name={customer?.data?.name}
          email={customer?.data?.email}
          phone={customer?.data?.phone}
          saleType={customer?.data?.saleType}
          saleAmount={customer?.data?.saleAmount}
          books={customer?.data?.books}
          deleteRecord={deleteRecord}
        />
      ))}
    </div>
  );
};

export default AllCustomers;
