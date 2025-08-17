'use client';

import Sidebar from "@/components/layouts/sidebar/sidebar";
import ThreeDotsComponent from "@/components/common/option_component";
import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { RootState } from "@/store/Store";
import LoadingAnimation from "@/components/common/loading_animation";
import ToggleBtnComponent from "@/components/layouts/sidebar/toggle_btn_component";
import SliderBtnComponent from "@/components/layouts/header/slider_btn_component";
import FormSearchComponent from "@/components/search_page/form_search_component";
import AuthButton from "@/components/common/auth_btn_component";
import EmptyDataComponent from "@/components/common/empty_data_component";
import { sliderBtnLeftIcon, sliderBtnRightIcon } from "@/dummy/icons";
import { authOptions, mainOptions } from "@/dummy/dropdown_options";
import TopWrapperComponent from "@/components/search_page/top_wrapper_component";
import BottomWrapperComponent from "@/components/search_page/bottom_wrapper_component";
import { setHasTerm, setIsMobile, setShowSidebar, toggleShowSidebar } from "@/store/Reducers/global_states";

export default function PageContent() {

    const dispatch = useAppDispatch();

    const { loading, data } = useAppSelector((state: RootState) => state.search);
    const { 
        hasTerm, 
        isMobile, 
        showSidebar
     } = useAppSelector((state: RootState) => state.global);

    const toggleSidebar = () => {
        dispatch(toggleShowSidebar());
    };

    const allOptions = isMobile ? [...authOptions, ...mainOptions] : mainOptions;

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            dispatch(setIsMobile(mobile));
            if (!mobile) {
                dispatch(setShowSidebar(true));
            }
        };
        checkMobile();
    }, [dispatch]);

    return (
        <Suspense fallback={<LoadingAnimation />}>
            <div className="flex min-h-screen bg-[#161727] text-white">
                {showSidebar && <Sidebar isMobile={isMobile} showSidebar={showSidebar} onClose={() => dispatch(setShowSidebar(false))} />}
                <main className={`flex-1 py-2 overflow-y-auto transition-all duration-300 ${(showSidebar && !isMobile) ? 'ml-[225px]' : 'ml-0'}`}>
                    <header className="flex items-center justify-between fixed top-0 left-0 right-0 bg-[#161727] z-10 px-3 py-1.5" style={{ left: showSidebar ? '225px' : 0 }}>
                        <div className="flex gap-1">
                            {isMobile ? (
                                <ToggleBtnComponent toggleSidebar={toggleSidebar} />
                            ) : (
                                <>
                                    <SliderBtnComponent icon={sliderBtnLeftIcon} />
                                    <SliderBtnComponent icon={sliderBtnRightIcon} />
                                </>
                            )}
                        </div>
                        <div className="flex-1 mx-3">
                            <FormSearchComponent isMobile={isMobile} setHasTerm={(hasTerm) => dispatch(setHasTerm(hasTerm))} />
                        </div>
                        <div className="flex items-center gap-2">
                            {!isMobile && (
                                <>
                                    <AuthButton label="Log in" />
                                    <AuthButton label="Sign up" />
                                </>
                            )}
                            <ThreeDotsComponent 
                                padding={0} 
                                color="white" 
                                options={allOptions}
                            />
                            <div className="mr-3"></div>
                        </div>
                    </header>
                    {                
                        !loading ? (
                                !hasTerm ? (
                                    <EmptyDataComponent text="Type in a search term to start" className="flex justify-center items-center py-20 text-gray-300 text-[20px]" />
                                ) : (
                                    <div className="page-result-wrapper">
                                        <TopWrapperComponent data={data} />
                                        <BottomWrapperComponent data={data} />
                                    </div>
                                )
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <LoadingAnimation 
                                    size={60}
                                    label="Loading..."
                                />
                            </div>
                        )
                    }
                </main>
            </div>
        </Suspense>
    );
}