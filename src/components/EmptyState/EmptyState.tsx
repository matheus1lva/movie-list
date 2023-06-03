import { Card, Typography } from "@mui/material";

interface EmptyStateProps {
    heading: string;
    text: string;
}

export default function EmptyState({ heading, text }: EmptyStateProps) {
    return (
        <Card
            variant="outlined"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "60px",
                margin: "20px",
                border: "4px dotted #ccc",
            }}
        >
            <Typography variant="h2">{heading} </Typography>
            <Typography variant="body2">{text} </Typography>
        </Card>
    );
}
