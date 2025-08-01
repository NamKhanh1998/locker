import { toast } from 'react-toastify'

export function displaySuccessToast(content: string) {
  toast.success(content, {
    className: 'custom-toast',
    progressClassName: 'custom-toast-progress',
    icon: false,
  })
}
