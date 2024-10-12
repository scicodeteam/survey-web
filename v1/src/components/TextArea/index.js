import clsx from 'clsx';
import styles from './TextArea.module.scss';

function TextArea(props) {
    const classes = clsx(styles.input, {
        [styles.style1]: props.style1,
        [styles.default]: props.default,
        [styles.primary]: props.primary,
        [styles.success]: props.success,
        [styles.info]: props.info,
        [styles.warning]: props.warning,
        [styles.danger]: props.danger,
        [styles.disabled]: props.disabled,
        // Add Class Error
        [styles.error]: props.error
    });

    const feedback = clsx(styles.feedback);

    return (
        <>
            {props.label && (
                <label htmlFor={props.name}>{props.label}</label>
            )}
            <textarea
                id={props.name}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                className={classes}
                autoFocus={props.autoFocus}
            />
            {props.error && (
                <div className={feedback}>{props.error}</div>
            )}
        </>
    )
}
export default TextArea;