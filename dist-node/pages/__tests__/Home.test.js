import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
// Mock Swiper components
vi.mock('swiper/react', () => ({
    Swiper: ({ children }) => _jsx("div", { children: children }),
    SwiperSlide: ({ children }) => _jsx("div", { children: children }),
}));
// Mock Swiper modules
vi.mock('swiper/modules', () => ({
    Navigation: vi.fn(),
    Pagination: vi.fn(),
    Autoplay: vi.fn(),
}));
// Mock Swiper styles
vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));
const renderWithRouter = (component) => {
    return render(_jsx(BrowserRouter, { children: component }));
};
describe('Home', () => {
    it('renders hero section with slides', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Premium Gemstones')).toBeInTheDocument();
        expect(screen.getByText('Sacred Rudraksha')).toBeInTheDocument();
        expect(screen.getByText('Traditional Wear')).toBeInTheDocument();
    });
    it('renders featured categories section', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Featured Categories')).toBeInTheDocument();
        expect(screen.getByText('Premium Gemstones')).toBeInTheDocument();
        expect(screen.getByText('Royal Collection')).toBeInTheDocument();
        expect(screen.getByText('Sacred Rudraksha')).toBeInTheDocument();
    });
    it('renders trending products section', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Trending Now')).toBeInTheDocument();
    });
    it('renders astrological gemstones section', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Astrological Gemstones')).toBeInTheDocument();
    });
    it('renders rudraksha collection section', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Sacred Rudraksha Collection')).toBeInTheDocument();
    });
    it('renders consultation section', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Expert Astrological Consultation')).toBeInTheDocument();
    });
    it('renders instagram feed section', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Follow Us on Instagram')).toBeInTheDocument();
    });
    it('renders mobile-specific components on mobile view', () => {
        renderWithRouter(_jsx(Home, {}));
        expect(screen.getByText('Trending Now')).toBeInTheDocument();
        expect(screen.getByText('New Arrivals')).toBeInTheDocument();
        expect(screen.getByText('Best Sellers')).toBeInTheDocument();
    });
});
