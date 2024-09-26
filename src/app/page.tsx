"use client"
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        フォーム開発手法とベストプラクティス
      </Typography>

      <Typography variant="body1" paragraph>
        このプロジェクトでは、React、TypeScript、Material-UI (MUI)、react-hook-formを使用して、
        高度なフォーム開発の手法とベストプラクティスを紹介しています。
        以下の主要な概念と技術を活用しています：
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="1. TypeScriptによる型安全性"
            secondary="厳密な型チェックによるバグの早期発見と開発効率の向上"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="2. react-hook-formの活用"
            secondary="効率的なフォーム状態管理とバリデーション"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="3. カスタムコンポーネントの作成"
            secondary="再利用可能で柔軟なUIコンポーネントの実装"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="4. Material-UI (MUI) の統合"
            secondary="一貫性のあるデザインと高度なUIコンポーネントの活用"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="5. 高度なバリデーション"
            secondary="複雑なバリデーションルールの実装と管理"
          />
        </ListItem>
      </List>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          サンプルフォームとドキュメント
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/test">
          バリデーションプレビューを見る
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2">
          このプロジェクトは、モダンなWebフォーム開発の best practices を示すことを目的としています。
          各概念の詳細な説明とコード例については、バリデーションプレビューページを参照してください。
        </Typography>
      </Box>
    </Box>
  );
}