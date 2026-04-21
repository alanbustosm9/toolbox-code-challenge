import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchVideos } from "../store/videosSlice";

export function useVideos() {
  const dispatch = useAppDispatch();
  const carousels = useAppSelector((state) => state.carousel.carousels);
  const loading = useAppSelector((state) => state.carousel.loading);
  const error = useAppSelector((state) => state.carousel.error);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return { carousels, loading, error };
}
