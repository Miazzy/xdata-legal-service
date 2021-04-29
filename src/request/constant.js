export const PDF_PREVIEW_URL = `${window.requestAPIConfig.domain}/jeecg-boot/generic/web/viewer.html?file=`;
export const OFFICE_PREVIEW_URL = 'https://fileview.shengtai.club/onlinePreview?officePreviewType=image&url=';
export const OFFICE_PREVIEW_TYPE = ['doc', 'docx', 'xlsx', 'xls', 'ppt', 'pptx'];
export const WORKFLOW_STATUS = { 1: '待提交', 2: '处理中', 3: '审核中', 4: '已完成', 5: '已知会' };
export const WORKSTEP_STATUS = { 1: '-1', 2: '0', 3: '1', 4: '2', 5: '3' };
export const WORKSTEP_TYPE = { 1: 'none', 2: 'primary', 3: 'primary', 4: 'success', 5: 'success' };
export const LEAVE_TYPE = { 'affairs_leave': '事假', 'sick_leave': '病假', 'marital_leave': '婚假', 'funeral_leave': '丧假', 'maternity_leave': '产假', 'paternity_leave': '陪产假', 'annual_leave': '年假', 'wr_injury_leave': '工伤假', 'other_leave': '其他' };
export const REQUEST_API_CONFIG = {
    domain: window._CONFIG['domain'],
    restapi: window._CONFIG['restAPI'],
    token: `${window._CONFIG['domain']}/jeecg-boot/sys/common/token`,
    user: `${window._CONFIG['domain']}/jeecg-boot/api/user`,
    role: `${window._CONFIG['domain']}/jeecg-boot/api/role`,
    service: `${window._CONFIG['domain']}/jeecg-boot/api/service`,
    permission: `${window._CONFIG['domain']}/jeecg-boot/api/permission`,
    permissionNoPager: `${window._CONFIG['domain']}/jeecg-boot/api/permission/no-pager`,
};