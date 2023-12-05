import { css } from '@style/css';

const statusTextContainerStyle = css({
  display: 'inline-flex',
  padding: '4px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '999px',
  border: '1px solid var(--alert-info-default, #82DD55)',
  background: 'var(--alert-success-dark, #355A23)',
  marginTop: '16px',
});

const statusTextStyle = css({
  color: '#FFF',
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal',
});

const buttonContainerStyle = css({
  display: 'flex',
  width: '900px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '10px',
  marginTop: '19px',
});

export { statusTextContainerStyle, statusTextStyle, buttonContainerStyle };
