import clsx from 'clsx';
import styles from './Button.module.scss';

function Button(props) {
    const classes = clsx(styles.btn, {
        [styles.style1]: props.style1,
        [styles.btnNK]: props.btnNK,
        [styles.btnHH]: props.btnHH,
        [styles.btnHH2]: props.btnHH2,
        [styles.default]: props.default,
        [styles.edit]: props.edit,
        [styles.primary]: props.primary,
        [styles.success]: props.success,
        [styles.info]: props.info,
        [styles.warning]: props.warning,
        [styles.danger]: props.danger,
        [styles.disabled]: props.disabled,
        [styles.block]: props.block,
        [styles.round]: props.round,
    });
    
    return (
        <button className={classes} t={props.id} onClick={props.handleClick} type={props.type} disabled={props.disabled} >
            {props.children} 
        </button>
    )
}
export default Button;