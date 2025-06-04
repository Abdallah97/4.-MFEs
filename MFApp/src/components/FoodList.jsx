import React, { useState, useEffect, lazy, Suspense}  from "react";
import LoadingIndicator from "./LoadingIndicator.jsx";
const CardDetails = lazy(() => import("DetailCardInHost/CardDetails"));
const CardShort = lazy(() => import("ShortCardInHost/CardShort"));

const FoodList = () => {
    const [detailItems, setDetailItems] = useState([]);
    const [shortItems, setShortItems] = useState([]);
    const [isLoadingDetail, setIsLoadingDetail] = useState(true);
    const [isLoadingShort, setIsLoadingShort] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(true);

    // Check if both sections are done loading
    const isAllLoaded = !isLoadingDetail && !isLoadingShort;

    useEffect(() => {
        if (isAllLoaded) {
            setIsPageLoading(false);
        }
    }, [isAllLoaded]);
  
      useEffect(() => {
        setIsLoadingDetail(true);
        fetch('https://dummyjson.com/recipes?limit=5&select=id,name,image,cuisine,rating')
        .then(res => res.json())
        .then(data => {
            setDetailItems(data.recipes);
            setIsLoadingDetail(false);
        })
        .catch(error => {
            console.error('Error fetching detail items:', error);
            setIsLoadingDetail(false);
        });
    }, []);
  
    useEffect(() => {
        setIsLoadingShort(true);
        fetch('https://dummyjson.com/recipes?limit=5&skip=10&select=id,name,image')
        .then(res => res.json())
        .then(data => {
            setShortItems(data.recipes);
            setIsLoadingShort(false);
        })
        .catch(error => {
            console.error('Error fetching short items:', error);
            setIsLoadingShort(false);
        });
    }, []);    // Show page loading on initial load
    if (isPageLoading) {
        return (
            <div className="page-loading">
                <LoadingIndicator message="Welcome! Loading delicious recipes..." />
            </div>
        );
    }

    return (
        <>
            <div className="short-list-container">
                <h2>Featured Recipes</h2>
                {isLoadingShort ? (
                    <LoadingIndicator type="skeleton" message="Loading featured recipes..." />
                ) : (
                    <Suspense fallback={<LoadingIndicator message="Loading components..." />}>
                        {shortItems.length > 0 ? shortItems.map(item => {
                            return <CardShort key={item.id} data={item}></CardShort>
                        }) : (
                            <p className="no-data">No recipes available</p>
                        )}
                    </Suspense>
                )}
            </div>
            <div className="detail-list-container">
                <h2>Recipe Details</h2>
                {isLoadingDetail ? (
                    <LoadingIndicator message="Loading recipe details..." />
                ) : (
                    <Suspense fallback={<LoadingIndicator message="Loading components..." />}>
                        {detailItems.length > 0 ? detailItems.map(item => {
                            return <CardDetails key={item.id} data={item}></CardDetails>
                        }) : (
                            <p className="no-data">No recipes available</p>
                        )}
                    </Suspense>
                )}
            </div>
        </>
    )
}

export default FoodList;
