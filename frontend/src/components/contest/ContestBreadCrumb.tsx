import { css } from '@style/css';

interface Props {
  crumbs: string[];
}

export default function ContestBreadCrumb(props: Props) {
  const { crumbs } = props;

  return (
    <header>
      <div className={titleContainerStyle}>
        {crumbs.map((crumb, index) => (
          <span key={index} className={crumbStyle}>
            {crumb}
          </span>
        ))}
      </div>
    </header>
  );
}

const titleContainerStyle = css({
  backgroundColor: 'gray',
  color: 'black',
  padding: '10px',
  width: '850px',
  height: '50px',
  display: 'flex',
});

const crumbStyle = css({
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
