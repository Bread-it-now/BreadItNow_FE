import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';
import { describe, it, expect } from 'vitest';

describe('HomePage Rendering Test', () => {
  it('renders 메인페이지 and 검색페이지 이동 link', () => {
    render(<Page />);

    expect(screen.getByText('메인페이지')).toBeInTheDocument();
    expect(screen.getByText('검색페이지 이동')).toBeInTheDocument();
  });
});
