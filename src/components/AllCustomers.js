import React, { useEffect, useState } from "react";
import SingleCustomer from "./SingleCustomer";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Box, CircularProgress } from "@mui/material";

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCustomers = async () => {
    try {
      setLoading(true);
      let arr = [];

      const promsRef = collection(db, "customers");

      const q = query(promsRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        arr.push({ id: doc.id, data: doc.data() });
      });
      setCustomers(arr);
      setLoading(false);

      console.log("customers", customers);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
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
