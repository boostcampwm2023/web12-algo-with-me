import { css } from '@style/css';

interface Props {
  crumbs: string[];
}

export default function ContestBreadCrumb(props: Props) {
  const { crumbs } = props;

  return (
    <div className={titleContainerStyle}>
      {crumbs.map((crumb, index) => (
        <span key={index} className={crumbStyle}>
          {crumb}
        </span>
      ))}
    </div>
  );
}

const crumbStyle = css({
  fontWeight: 'bold',
  color: 'text.week',
  marginRight: '1rem',
  _after: {
    content: '">"',
    marginLeft: '1rem',
  },
  _last: {
    _after: {
      content: '""',
    },
  },
});

const titleContainerStyle = css({
  padding: '10px',
});
