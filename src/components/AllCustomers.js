import React, { useEffect, useState } from "react";
import SingleCustomer from "./SingleCustomer";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Box, CircularProgress, TextField } from "@mui/material";
import { format, startOfDay, endOfDay } from "date-fns";

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
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
          // console.log(doc.id, " => ", doc.data());
          arr.push({ id: doc.id, data: doc.data() });
        });
        setCustomers(arr);
        setLoading(false);
      } catch (error) {
        console.log("error", error.message);
      }
    };

    getCustomers();
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  //   const getCustomers = async () => {

  //   };

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
          key={customer.id}
          name={customer?.data?.name}
          email={customer?.data?.email}
          phone={customer?.data?.phone}
          saleType={customer?.data?.saleType}
          saleAmount={customer?.data?.saleAmount}
          books={customer?.data?.books}
        />
      ))}
    </div>
  );
};

export default AllCustomers;
