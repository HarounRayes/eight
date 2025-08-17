'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ResultLabelComponent from './result_label_component';
import { ResponseType } from '@/types/search_response_type.';
import SliderBtnComponent from '../layouts/header/slider_btn_component';
import { sliderBtnLeftIcon, sliderBtnRightIcon } from '@/dummy/icons';
import ThreeDotsComponent from '../common/option_component';
import { ObjectType } from '@/types/search_object_type';
import TopItemComponent from './top_item_component';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import EmptyDataComponent from '../common/empty_data_component';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { RootState } from '@/store/Store';
import { setIsMobile, setShowSidebar } from '@/store/Reducers/global_states';

interface TopWrapperComponentProps {
    data: ResponseType;
}

const TopWrapperComponent: React.FC<TopWrapperComponentProps> = ({ data }) => {

    const dispatch = useAppDispatch();
    const { 
        isMobile, 
    } = useAppSelector((state: RootState) => state.global);

    const swiperRef = useRef<SwiperType | null>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const scrollbarThumbRef = useRef<HTMLDivElement>(null);

    const [isMounted, setIsMounted] = useState(false);
    const [isGridLayout, setIsGridLayout] = useState(false);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isDragging, setIsDragging] = useState(false);

    const updateVisibleCount = useCallback(() => {
        if (!swiperRef.current || isGridLayout || !isMounted) return;
        const swiper = swiperRef.current;
        const containerWidth = swiper.width;
        const slideWidth = 210;
        const spaceBetween = Number(swiper.params.spaceBetween) || 0;
        let count = Math.floor((containerWidth + spaceBetween) / (slideWidth + spaceBetween));
        if (isMobile && count < 2) count = 2;
        setVisibleCount(count > 0 ? count : 1);
    }, [isGridLayout, isMounted, isMobile]);

    const handleScrollbarDrag = useCallback((e: MouseEvent) => {
        if (!isDragging || !swiperRef.current || !scrollbarRef.current) return;
        const swiper = swiperRef.current;
        const scrollbar = scrollbarRef.current;
        const rect = scrollbar.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        swiper.slideTo(Math.round(position * (swiper.slides.length - visibleCount)));
    }, [isDragging, visibleCount]);

    const handleScrollbarDragEnd = useCallback(() => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleScrollbarDrag);
        document.removeEventListener('mouseup', handleScrollbarDragEnd);
    }, [handleScrollbarDrag]);

    const updateScrollbar = useCallback(() => {
        if (!swiperRef.current || !scrollbarRef.current || !scrollbarThumbRef.current || isGridLayout) return;
        const swiper = swiperRef.current;
        const scrollbar = scrollbarRef.current;
        const thumb = scrollbarThumbRef.current;
        const progress = swiper.progress;
        const scrollbarWidth = scrollbar.offsetWidth;
        const thumbWidth = scrollbarWidth * (visibleCount / swiper.slides.length);
        thumb.style.width = `${thumbWidth}px`;
        thumb.style.transform = `translateX(${progress * (scrollbarWidth - thumbWidth)}px)`;
    }, [visibleCount, isGridLayout]);

    const handleScrollbarDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        document.addEventListener('mousemove', handleScrollbarDrag);
        document.addEventListener('mouseup', handleScrollbarDragEnd);
    };

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            dispatch(setIsMobile(mobile));
            if (!mobile) {
                dispatch(setShowSidebar(true));
            }
        };
        
        checkMobile();
        setIsMounted(true);
        
        const resizeHandler = () => {
            checkMobile();
            updateVisibleCount();
        };
        
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
            setIsMounted(false);
        };
    }, [updateVisibleCount]);

    useEffect(() => {
        if (isMounted && !isGridLayout) {
            updateVisibleCount();
            return () => window.removeEventListener("resize", updateVisibleCount);
        }
    }, [isGridLayout, isMounted, updateVisibleCount]);

    useEffect(() => {
        if (!swiperRef.current || !isMounted) return;
        const swiper = swiperRef.current;
        swiper.on('progress', updateScrollbar);
        swiper.on('resize', updateScrollbar);
        return () => {
            swiper.off('progress', updateScrollbar);
            swiper.off('resize', updateScrollbar);
        };
    }, [updateScrollbar, isMounted]);

    return (
        <div className="pt-[60px] mt-5">
            <div className="px-[20px] py-[10px] flex items-center justify-between border-b-1 border-b-[#50515d80] sticky top-[60px] bg-[#161727]">
                <ResultLabelComponent text="Top Results for" label={data.keyword} />
                <div className="flex items-center gap-2">
                    {!isGridLayout && (
                        <div className="flex items-center gap-0">
                            <SliderBtnComponent icon={sliderBtnLeftIcon} onClick={() => swiperRef.current?.slidePrev()} />
                            <SliderBtnComponent icon={sliderBtnRightIcon} onClick={() => swiperRef.current?.slideNext()} />
                        </div>
                    )}
                    <ThreeDotsComponent padding={0} color="white" options={[
                        {
                            title: "Switch" + (isGridLayout ? ' layout to scroll' : ' layout to grid'), 
                            isSeparator: false, 
                            onClick: () => {
                                setIsGridLayout(!isGridLayout);
                                if (swiperRef.current && !isGridLayout) {
                                    swiperRef.current.slideTo(0);
                                }
                            }
                        },
                    ]} />
                </div>
            </div>
            <div className="items p-4">
                {
                    data?.result_count > 0 ? (
                        isGridLayout ? (
                    <div className="grid gap-4" style={{
                        gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? 'min(150px, 100%)' : '220px'}, 1fr))`
                    }}>
                        {data?.data?.map((obj: ObjectType, idx: number) => (
                            <div key={idx} className="w-full">
                                <TopItemComponent
                                    image={obj.artwork_url}
                                    title={obj.artist_name}
                                    label={obj.collection_name}
                                    colorIndex={idx}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {isMounted && (
                            <Swiper
                                spaceBetween={15}
                                slidesPerView={visibleCount}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                    updateVisibleCount();
                                    updateScrollbar();
                                }}
                                onResize={() => {
                                    updateVisibleCount();
                                    updateScrollbar();
                                }}
                                onSlideChange={updateScrollbar}
                            >
                                {data?.data?.map((obj: ObjectType, idx: number) => (
                                    <SwiperSlide
                                        key={idx}
                                        style={{ 
                                            width: '220px',
                                        }}
                                    >
                                        <TopItemComponent
                                            image={obj.artwork_url}
                                            title={obj.artist_name}
                                            label={obj.collection_name}
                                            colorIndex={idx}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                        {(!isGridLayout && data.result_count > 0) && (
                            <div
                                ref={scrollbarRef}
                                className="relative bg-[#50515d80] w-full h-0.5 mt-5 rounded-full hover:h-2 transition-all duration-200 cursor-pointer"
                                onClick={(e) => {
                                    if (!swiperRef.current || !scrollbarRef.current) return;
                                    const swiper = swiperRef.current;
                                    const scrollbar = scrollbarRef.current;
                                    const rect = scrollbar.getBoundingClientRect();
                                    const position = (e.clientX - rect.left) / rect.width;
                                    swiper.slideTo(Math.round(position * (swiper.slides.length - visibleCount)));
                                }}
                            >
                                <div 
                                    ref={scrollbarThumbRef}
                                    className="absolute bg-[#424281] h-full rounded-full cursor-grab active:cursor-grabbing"
                                    onMouseDown={handleScrollbarDragStart}
                                />
                            </div>
                        )}
                    </>
                )
                    ) : (
                        <EmptyDataComponent text="No results found" keyword={data.keyword} className="flex justify-center items-center py-7" />
                    )
                }
            </div>
        </div>
    );
};

export default TopWrapperComponent;