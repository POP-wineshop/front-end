import { RootState } from '@/shared/store'; // store 타입 import
import { createSelector } from '@reduxjs/toolkit';

// 와인 전체 목록 가져오기
export const selectWineList = (state: RootState) => state.wine.wineList;

// 필터 값 가져오기
export const selectWineFilter = (state: RootState) => state.wine.filter;
