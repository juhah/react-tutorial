import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>HN Reader</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Hacker News
    </IndexLink>
    {' · '}
    <Link to='/newest' activeClassName='route--active'>
      new
    </Link>
    {' · '}
    <Link to='/newcomments' activeClassName='route--active'>
      comments
    </Link>
    {' · '}
    <Link to='/show' activeClassName='route--active'>
      show
    </Link>
    {' · '}
    <Link to='/jobs' activeClassName='route--active'>
      jobs
    </Link>
  </div>
)

export default Header
