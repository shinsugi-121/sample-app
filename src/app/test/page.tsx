"use client"
import React from 'react';
import { useForm, Controller, Control, FieldValues, RegisterOptions, useWatch } from "react-hook-form";
import { TextField, Button, Box, Typography, Paper, Grid, TextFieldProps } from "@mui/material";

type Inputs = {
  anything: string;
  alphanumericSymbols: string;
  alphanumeric: string;
  numeric: string;
  maxLength: string;
  required: string;
}

interface CustomTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: keyof Inputs;
  control: Control<Inputs>;
  rules?: RegisterOptions;
  value?: string | number;
}

function CustomTextField({ name, control, rules, value, ...rest }: CustomTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={value as string}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          value={field.value ?? ''}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

export default function ValidationPreview() {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    setValue
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      anything: "",
      alphanumericSymbols: "",
      alphanumeric: "",
      numeric: "",
      maxLength: "",
      required: ""
    }
  })

  const onSubmit = (data: Inputs) => console.log(data)

  const formValues = useWatch({ control });

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Validation Preview
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                name="anything"
                control={control}
                label="なんでも可能"
                value={formValues.anything}
                placeholder="どんな入力も受け付けます"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="alphanumericSymbols"
                control={control}
                label="英数字記号"
                value={formValues.alphanumericSymbols}
                placeholder="英数字と記号のみ入力可能"
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/,
                    message: "英数字と記号のみ入力可能です"
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="alphanumeric"
                control={control}
                label="英数字"
                value={formValues.alphanumeric}
                placeholder="英数字のみ入力可能"
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9]*$/,
                    message: "英数字のみ入力可能です"
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="numeric"
                control={control}
                label="数字"
                value={formValues.numeric}
                placeholder="数字のみ入力可能"
                rules={{
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "数字のみ入力可能です"
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="maxLength"
                control={control}
                label="最大桁数5桁"
                value={formValues.maxLength}
                placeholder="最大5文字まで入力可能"
                rules={{
                  maxLength: {
                    value: 5,
                    message: "最大5文字まで入力可能です"
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="required"
                control={control}
                label="必須チェック"
                value={formValues.required}
                placeholder="この項目は必須です"
                rules={{
                  required: "この項目は必須です"
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
            sx={{ mt: 2 }}
          >
            送信
          </Button>
        </form>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">フォームの状態:</Typography>
        <pre>{JSON.stringify({ isValid, errors, values: formValues }, null, 2)}</pre>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>開発者向けドキュメント: 実装方法と主要概念</Typography>

        <Typography variant="h6" gutterBottom>1. TypeScriptによる型定義</Typography>
        <Typography variant="body1" paragraph>
          フォームのフィールドとカスタムコンポーネントの型を定義します：
        </Typography>
        <pre>{`
type Inputs = {
  anything: string;
  alphanumericSymbols: string;
  // ... 他のフィールド
};

interface CustomTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: keyof Inputs;
  control: Control<Inputs>;
  rules?: RegisterOptions;
  value?: string | number;
}
        `}</pre>

        <Typography variant="h6" gutterBottom>2. react-hook-formの設定</Typography>
        <Typography variant="body1" paragraph>
          useFormフックを使用してフォームを初期化し、必要な関数と状態を取得します：
        </Typography>
        <pre>{`
const {
  control,
  handleSubmit,
  formState: { isValid, errors },
  setValue
} = useForm<Inputs>({
  mode: "onChange",
  defaultValues: {
    anything: "",
    // ... 他のフィールドの初期値
  }
});

const onSubmit = (data: Inputs) => console.log(data);
        `}</pre>

        <Typography variant="h6" gutterBottom>3. カスタムTextFieldコンポーネントの実装</Typography>
        <Typography variant="body1" paragraph>
          MUIのTextFieldとreact-hook-formのControllerを組み合わせたカスタムコンポーネントを作成します：
        </Typography>
        <pre>{`
function CustomTextField({ name, control, rules, value, ...rest }: CustomTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={value as string}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          value={field.value ?? ''}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
        `}</pre>

        <Typography variant="h6" gutterBottom>4. バリデーションルールの適用</Typography>
        <Typography variant="body1" paragraph>
          各フィールドに適切なバリデーションルールを設定します：
        </Typography>
        <pre>{`
<CustomTextField
  name="alphanumeric"
  control={control}
  label="英数字"
  value={formValues.alphanumeric}
  placeholder="英数字のみ入力可能"
  rules={{
    pattern: {
      value: /^[a-zA-Z0-9]*$/,
      message: "英数字のみ入力可能です"
    }
  }}
/>
        `}</pre>

        <Typography variant="h6" gutterBottom>5. フォームの状態監視</Typography>
        <Typography variant="body1" paragraph>
          useWatchフックを使用して、フォームの値をリアルタイムで監視します：
        </Typography>
        <pre>{`
const formValues = useWatch({ control });
        `}</pre>

        <Typography variant="h6" gutterBottom>6. 送信ボタンの制御</Typography>
        <Typography variant="body1" paragraph>
          フォームの有効性に基づいて送信ボタンを制御します：
        </Typography>
        <pre>{`
<Button
  type="submit"
  variant="contained"
  color="primary"
  disabled={!isValid}
  sx={{ mt: 2 }}
>
  送信
</Button>
        `}</pre>

        <Typography variant="h6" gutterBottom>7. 開発のベストプラクティス</Typography>
        <Typography variant="body1">
          - コンポーネントの再利用: CustomTextFieldのような再利用可能なコンポーネントを作成し、コードの重複を避けます。<br />
          - 型安全性: TypeScriptの型システムを最大限に活用し、開発時のエラーを減らします。<br />
          - バリデーションの一元管理: react-hook-formを使用してバリデーションロジックを一元管理し、一貫性を保ちます。<br />
          - UI/UXの一貫性: Material-UIのコンポーネントとスタイリングシステムを使用して、一貫したデザインを維持します。<br />
          - パフォーマンス最適化: useWatchなどのフックを適切に使用し、不要な再レンダリングを避けます。
        </Typography>
      </Box>
    </Box>
  );
}