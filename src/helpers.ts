import moment from 'moment';

export const formatDate = (date: string): string => (date ? moment(date).format('MM/DD/YYYY') : 'NA');
export const formatDateTime = (date: string): string => (date ? moment(date).format('MM/DD/YYYY hh:mm A') : 'NA');
