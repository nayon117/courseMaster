import { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";

const useCourses = (params) => {
  const [data, setData] = useState({ courses: [], total: 0, pages: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic.get("/courses", { params });
      setData({
        courses: res.data.data,
        total: res.data.total,
        pages: res.data.pages,
      });
    };
    fetchData();
  }, [params]);

  return data;
}

export default useCourses;
