import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import AuthContext from "context/auth-context";

import Layout from "./Layout";
import LoadingSpinner from "components/LoadingSpinner";

import ImageVideoModal from "containers/ImageVideoModal";
const HomePage = lazy(() => import("containers/HomePage"));
const SearchPage = lazy(() => import("containers/SearchPage"));
const MediaPage = lazy(() => import("containers/MediaPage"));
const MediaImagesPage = lazy(() => import("containers/MediaImagesPage"));
const MediaVideosPage = lazy(() => import("containers/MediaVideosPage"));
const MediaCastPage = lazy(() => import("containers/MediaCastPage"));
const MediaReviewsPage = lazy(() => import("containers/MediaReviewsPage"));
const ImageVideoPage = lazy(() => import("containers/ImageVideoPage"));
const SingleReviewPage = lazy(() => import("containers/SingleReviewPage"));
const WatchlistPage = lazy(() => import("containers/WatchlistPage"));
const LoginPage = lazy(() => import("containers/LoginPage"));

const AppRoutes = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  /* 
  'backgroundLocation' is set when one of the image or video links are
  clicked, then we're passing it to the <Routes> element so that we can
  still show the page behind the <ImageVideoModal>, if 'backgroundLocation'
  is not set <ImageVideoPage> will be rendered instead
  */

  const state = location.state; // { backgroundLocation: location }

  // prettier-ignore
  return (
    <>
      <Suspense fallback={<div className="center-spinner"><LoadingSpinner /></div>}>
        <Routes location={state?.backgroundLocation || location}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watchlist" element={<Navigate to="/watchlist/movie" />} />
            <Route path="/watchlist/:mediaType" element={<WatchlistPage />} />
            
            {!authContext.sessionId && <Route path="/login" element={<LoginPage />} />}

            <Route path="/:mediaType/:mediaId">
              <Route index element={<MediaPage />} />
              <Route path="images" element={<MediaImagesPage/>} />
              <Route path="videos" element={<MediaVideosPage />} />
              <Route path="reviews" element={<MediaReviewsPage />} />
              <Route path="cast" element={<MediaCastPage />} />
              <Route path="reviews/:reviewId" element={<SingleReviewPage />} />
              <Route path='images/:filePath' element={<ImageVideoPage type="image"/>} />
              <Route path='videos/:filePath' element={<ImageVideoPage type="video"/>} />
            </Route>
            
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Display modal if 'backgroundLocation' is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/:mediaType/:mediaId/images/:filePath" element={<ImageVideoModal type="image" />} />
          <Route path="/:mediaType/:mediaId/videos/:filePath" element={<ImageVideoModal type="video" />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
