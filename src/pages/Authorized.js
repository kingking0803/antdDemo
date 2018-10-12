import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import Exception from '@/components/Exception';
import { getAuthority } from '@/utils/authority';
import { matchRoutes } from 'react-router-config';
import intersection from 'lodash/intersection';
import Link from 'umi/link';

const Authorized = RenderAuthorized(getAuthority());

export default ({ children, route, location }) => {
  const routes = matchRoutes(route.routes, location.pathname);
  console.log(routes,"page");
  const authorities = [];
  routes.forEach(item => {
    if (Array.isArray(item.route.authority) && item.route.authority.length) {
      authorities.push(item.route.authority);
    } else if (typeof item.route.authority === 'string' && item.route.authority) {
      authorities.push([item.route.authority]);
    }
  });
  console.log(authorities,"authorities");
  const noMatch = (
    <Exception
      type="403"
      desc="抱歉，你无权访问该页面"
      linkElement={Link}
      backText="返回首页"
    />
  );
  return (
    <Authorized
      authority={authorities.length === 0 ? undefined : intersection(...authorities)}
      noMatch={noMatch}
    >
      {children}
    </Authorized>
  );
};
